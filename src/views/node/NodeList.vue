<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue';
import Navigation from '@/components/Navigation.vue';
import Search from '@/components/Search.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { NodeModel } from '@/models/node.model';
import { NodeService } from '@/services/node.service';
import { generateLastReport } from '@/utils';
import { onMounted, ref } from 'vue';

const logout = useLogout()
const nodes = ref<NodeModel[]>()
const search = ref<string>('')

function loadNodes() {
    NodeService.getNodes(search.value)
        .then(rsp => nodes.value = rsp.data)
        .catch(e => logout())
}

function isOnline(node: NodeModel): boolean {
    const lastReportDate = new Date(node.lastReportAt);
    const now = new Date();

    const diffInMs = now.getTime() - lastReportDate.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    return diffInMinutes <= (import.meta.env.VITE_NODE_TIMEOUT_IN_MIN || 3);
}

onMounted(() => loadNodes())
</script>

<template>
    <Navigation />
    <h3>Nodes</h3>
    <Search v-model="search" @change="loadNodes">
        <div class="btn-group">
            <RouterLink class="btn btn-primary" to="/node/new">
                <i class="fa-solid fa-plus"></i> Add node
            </RouterLink>
        </div>
    </Search>
    <DataTable :data="nodes">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CIRD</th>
                <th scope="col">Network</th>
                <th scope="col">Location</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="node of nodes">
                <th scope="row">{{ node.nodeId }}</th>
                <td>{{ node.name }}</td>
                <td>{{ node.network.range }}</td>
                <td>{{ node.network.name }}</td>
                <td>{{ node.network.location.name }}</td>
                <td>{{ node.address }}</td>
                <td>
                    <span v-if="!node.lastReportAt">
                        <i class="fa-solid fa-circle text-secondary"></i> Unknown
                    </span>
                    <span v-else-if="node.lastReportAt && isOnline(node)"
                        :title="generateLastReport(node.lastReportAt)">
                        <i class="fa-solid fa-circle text-success"></i> Online
                    </span>
                    <span v-else :title="generateLastReport(node.lastReportAt)">
                        <i class="fa-solid fa-circle text-danger"></i> Offline
                    </span>
                </td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/node/${node.nodeId}`" class="btn btn-sm btn-light">
                            <i class="fa-solid fa-terminal"></i>
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </tbody>
    </DataTable>
</template>