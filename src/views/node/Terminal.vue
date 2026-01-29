<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CommandModel } from '@/models/command.model';
import type { NodeModel } from '@/models/node.model';
import { NodeService } from '@/services/node.service';
import { showLoading } from '@/utils';
import Swal from 'sweetalert2';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const logout = useLogout()
const route = useRoute()
const id = Number(route.params.id)

const node = ref<NodeModel>()
const consoleRef = ref<HTMLDivElement | null>(null)
const commands = ref<CommandModel[]>([])

const inputRef = ref<HTMLInputElement | null>(null)
const commandText = ref('')

function retrieveCommands() {
    NodeService.retrieveTerminalContent(id)
        .then(rsp => {
            const existing = new Set(commands.value.map(c => c.createdAt))
            const newCommands = rsp.data.filter((cmd: CommandModel) => !existing.has(cmd.createdAt))
            commands.value.push(...newCommands)
        })
        .catch(() => logout())
}

function loadData() {
    showLoading()
    NodeService.getNodeById(id)
        .then(rsp => node.value = rsp.data)
        .catch(() => logout())
        .finally(() => Swal.close())
}

function sendCommand() {
  const text = commandText.value.trim()
  if (!text) return

  commandText.value = ''
  nextTick(() => inputRef.value?.focus())

  return NodeService.sendTerminalCommand(id, text)
    .catch(() => logout())
}


const load = setInterval(() => retrieveCommands(), 2000)

onMounted(() => {
    loadData()
    nextTick(() => inputRef.value?.focus())
})

onBeforeUnmount(() => clearInterval(load))

watch(
    () => commands.value.length,
    async () => {
        await nextTick()
        if (consoleRef.value) {
            consoleRef.value.scrollTop = consoleRef.value.scrollHeight
        }
    }
)
</script>


<template>
    <Navigation />

    <nav aria-label="breadcrumb" v-if="node">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/node">Nodes</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ node.name }} ({{ node.network.range }})
            </li>
        </ol>
    </nav>

    <h3>Remote Terminal</h3>

    <!-- terminal frame -->
    <div class="terminal-frame mt-3">
        <div class="console" ref="consoleRef">
            <div class="text-light">
                [SYSTEM] Connecting to remote server...
            </div>

            <div v-for="(log, index) in commands" :key="index" class="text-light">
                <span v-if="log.type == 'cmd'">
                    [{{ new Date(log.createdAt).toLocaleTimeString('sr-RS') }}] &gt;&gt;
                </span>
                {{ log.value }}
            </div>
        </div>

        <!-- prompt -->
        <div class="terminal-input input-group">
            <span class="input-group-text terminal-prefix">&gt;</span>
            <input
                ref="inputRef"
                v-model="commandText"
                class="form-control terminal-control"
                type="text"
                autocomplete="off"
                spellcheck="false"
                placeholder="Type a command and press Enter..."
                @keydown.enter.prevent="sendCommand"
            />
            <button class="btn btn-primary" type="button" @click="sendCommand">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>
</template>

<style>
.terminal-frame {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.console {
    width: 100%;
    height: 400px;
    background-color: #222;
    color: #fff;
    overflow-y: auto;
    padding: 10px;
}

.console div {
    font-family: Consolas, monospace;
}

.terminal-input {
    background: #1b1b1b;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px;
}

.terminal-prefix {
    background: #111;
    color: #9fd3ff;
    border-color: rgba(255, 255, 255, 0.12);
    font-family: Consolas, monospace;
}

.terminal-control {
    background: #111;
    color: #fff;
    border-color: rgba(255, 255, 255, 0.12);
    font-family: Consolas, monospace;
}

.terminal-control:focus {
    background: #111;
    color: #fff;
    border-color: rgba(13, 110, 253, 0.6);
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}
</style>
