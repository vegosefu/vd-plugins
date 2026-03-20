import { React, ReactNative as RN } from "@vendetta/metro/common";
import { findByProps, findByName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";

// ================================================================
// STORAGE
// ================================================================
storage.messages ??= [];
storage.running ??= false;

// ================================================================
// WORDS MAP - AUTOCORRECT
// ================================================================
const wordsMap: Record<string, string> = {
    'pjs': 'pis', 'ya': 'ta', 'rs': 'ra', 'tm': 'mt',
    'ois': 'pis', 'ojs': 'pis', 'sma': 'sa\nma', 'sama': 'sa\nma',
    'petn': 'pe\ntn', 'pks': 'pis', 'oks': 'pis', 'mr': 'mt',
    'ri': 'ti', 'spe': 'si\npe', 'tj': 'tn', 'ea': 'ra',
    'cape': 'cac\npe', 'iah': 'iau', 'di': 'si', 'fuy': 'fut',
    'vac': 'cac', 'vav': 'cac', 'sata': 'sa\nta', 'sta': 'sa\nta',
    'tasa': 'ta\nsa', 'lis': 'pis', 'ms': 'ma', 'mari': 'ma\nti',
    'pja': 'pis', 'pipe': 'pis\npe', 'puspe': 'pis\npe', 'ous': 'pis',
    'rn': 'tn', 'dw': 'de', 'cax': 'cac', 'xac': 'cac',
    'aa': 'sa', 'pus': 'pis', 'xax': 'cac', 'ran': 'fan',
    'dan': 'fan', 'oau': 'pis', 'us': 'pis', 'oe': 'pe',
    'marj': 'ma\nti', 'gi': 'ti', 'ds': 'ra', 'rj': 'ti',
    'rssa': 'ra\nsa', 'essa': 'ra\nsa', 'rada': 'ra\nsa',
    'ma cac': 'ma\ncac', 'ma pis': 'ma\npis',
    'maa': 'ma', 'saa': 'sa', 'fn': 'tn', 'pispe': 'pis\npe',
    'cacpe': 'cac\npe', 'pw': 'pe', 'le': 'pe', 'tb': 'tn',
    'da': 'ra', 'mpis': 'ma\npis', 'za': 'sa', 'so': 'si',
    'can': 'fan', 'sipe': 'si\npe', 'macac': 'ma\ncac', 'mapis': 'ma\npis',
    'fug': 'fut', 'sk': 'si', 'ljs': 'pis', 'pmr': 'pe\nmt',
    'pe mr': 'pe\nmt', 'pemt': 'pe\nmt', 'pe mt': 'pe\nmt',
    'pe tn': 'pe\ntn', 'pr': 'pe', 'per': 'pe\nra', 'pera': 'pe\nra',
    'peta': 'pe\nra', 'sti': 'ti', 'tsi': 'tn\nsi', 'raa': 'ra',
    'tide': 'ti\nde', 'rm': 'tn', 'st': 'sa\nta', 'mlis': 'ma\npis',
    'pos': 'pis', 'pospe': 'pis\npe', 'pope': 'pis\npe', 'is': 'pis',
    'tr': 'te', 'acc': 'cac', 'peea': 'pe\nra', 'sile': 'si\npe',
    'sle': 'si\npe', 'dut': 'fut', 'pmt': 'pe\nmt', 'fanan': 'fan',
    'fanam': 'fan', 'pms': 'pis', 'va': 'ca', 'fana': 'fan',
    'taasa': 'ta\nsa', 'mam': 'ma', 'taza': 'ta\nsa', 'os': 'si',
    'tos': 'tn', 'pia': 'pis', 'lia': 'pis', 'gj': 'gu',
    'gra': 'gu\nra', 'lw': 'pe', 'tk': 'ti', 'sj': 'si',
    'cqc': 'cac', 'poa': 'pis', 'nt': 'mt', 'saya': 'sa\nta',
    'mw': 'ma', 'rk': 'ti', 'taa': 'ta', 'cale': 'cac\npe',
    'mpjs': 'ma\npis', 'mai': 'mt\nsi', 'pipw': 'pis\npe', 'tw': 'ta',
    'ama cac': 'ama\ncac', 'oispe': 'pis\npe',
    'pw tn': 'pe\ntn', 'pwtn': 'pe\ntn', 'pw mt': 'pe\nmt', 'pwmt': 'pe\nmt',
    'mljs': 'ma\npis', 'ow': 'pe', 'si pe': 'si\npe', 'maacc': 'ma\ncac',
    'ai': 'si', 'th': 'tn', 'ohs': 'pis', 'mpia': 'ma\npis',
    'acpe': 'cac\npe', 'accpe': 'cac\npe', 'vape': 'cac\npe',
    'taaa': 'ta\nsa', 'letj': 'pe\ntn', 'cc': 'cac', 'pjpe': 'pis\npe',
    'pe nr': 'pe\ntn', 'penr': 'pe\ntn', 'acca': 'cac', 'nr': 'mt',
    'me': 'ma', 'pern': 'pe\ntn', 'petj': 'pe\ntn', 'pns': 'pis',
    'caep': 'cac\npe', 'mcac': 'ma\ncac', 'sioe': 'si\npe',
    'tnsi': 'tn\nsi', 'na': 'ma', 'caca': 'cac', 'piw': 'pis',
    'fr': 'ft', 'ns': 'ma', 'oia': 'pis',
};

const sortedKeys = Object.keys(wordsMap).sort((a, b) => b.length - a.length);
const allKeysLower = sortedKeys.map(k => k.toLowerCase());
const crossLineKeys = sortedKeys.filter(k => k.includes('\n'));

function isPrefixOfLongerKey(phrase: string): boolean {
    const lower = phrase.toLowerCase();
    return allKeysLower.some(k => k.includes(' ') && k.startsWith(lower + ' '));
}

function applyCorrection(word: string): string | null {
    if (!word) return null;
    const lower = word.toLowerCase();
    if (word === word.toUpperCase() && /[A-Z]/.test(word)) return null;
    for (const key of sortedKeys) {
        if (lower === key.toLowerCase()) return wordsMap[key];
    }
    return null;
}

function findMatch(textBefore: string, allowPrefixSkip: boolean): { phrase: string; corrected: string; crossLine?: boolean; matchLen?: number } | null {
    for (const key of crossLineKeys) {
        const tail = textBefore.slice(-key.length);
        if (tail.toLowerCase() === key.toLowerCase()) {
            const word = textBefore.slice(-key.length);
            if (word === word.toUpperCase() && /[A-Z]/.test(word)) continue;
            return { phrase: key, corrected: wordsMap[key], crossLine: true, matchLen: key.length };
        }
    }
    const lines = textBefore.split('\n');
    const lastLine = lines[lines.length - 1];
    const words = lastLine.split(' ');
    for (let n = Math.min(3, words.length); n >= 1; n--) {
        const phrase = words.slice(words.length - n).join(' ');
        const corrected = applyCorrection(phrase);
        if (corrected !== null) {
            if (allowPrefixSkip && isPrefixOfLongerKey(phrase)) continue;
            return { phrase, corrected, crossLine: false };
        }
    }
    return null;
}

// ================================================================
// MACRO STATE
// ================================================================
let running = false;
let stopNow = false;
let shuffledIndices: number[] = [];
let shufflePos = 0;
let autocorrectEnabled = true;
const trimiseDeja = new Set<string>();
const extraLetters = 'aeiourstmn';

function splitMessages(text: string): string[] {
    if (!text || !text.trim()) return [];
    const lines = text.split('\n');
    const msgs: string[] = [];
    let current: string[] = [];
    for (const line of lines) {
        if (line.trim() === '' && current.length > 0) {
            msgs.push(current.join('\n'));
            current = [];
        } else if (line.trim() !== '') {
            current.push(line);
        }
    }
    if (current.length > 0) msgs.push(current.join('\n'));
    return msgs;
}

function rebuildShuffle() {
    const messages: string[] = storage.messages ?? [];
    shuffledIndices = messages.map((_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    shufflePos = 0;
}

function nextMessage(): string {
    const messages: string[] = storage.messages ?? [];
    if (shuffledIndices.length === 0) rebuildShuffle();
    if (shufflePos >= shuffledIndices.length) rebuildShuffle();
    return messages[shuffledIndices[shufflePos++]];
}

function mutateMesaj(msg: string): string {
    const key = msg.trim();
    if (!trimiseDeja.has(key)) { trimiseDeja.add(key); return msg; }
    const lines = msg.split('\n');
    const eligibile = lines.map((l, i) => ({ l: l.trim(), i })).filter(x => x.l.length >= 2);
    if (eligibile.length === 0) return msg;
    const ales = eligibile[Math.floor(Math.random() * eligibile.length)];
    const linie = ales.l;
    const pos = Math.floor(Math.random() * (linie.length + 1));
    const litera = extraLetters[Math.floor(Math.random() * extraLetters.length)];
    const linieNoua = linie.slice(0, pos) + litera + linie.slice(pos);
    const liniiNoi = [...lines];
    liniiNoi[ales.i] = linieNoua;
    return liniiNoi.join('\n');
}

// ================================================================
// SEND MESSAGE via Discord API
// ================================================================
function getCurrentChannelId(): string | null {
    try {
        const SelectedChannelStore = findByProps('getChannelId', 'getVoiceChannelId');
        return SelectedChannelStore?.getChannelId?.() ?? null;
    } catch { return null; }
}

function sendDiscordMessage(content: string): void {
    try {
        const MessageActions = findByProps('sendMessage', '_sendMessage');
        const channelId = getCurrentChannelId();
        if (!channelId || !MessageActions) return;
        MessageActions.sendMessage(channelId, { content });
    } catch (e) {
        console.error('[Macro] sendMessage error:', e);
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}

async function macroLoop() {
    const messages: string[] = storage.messages ?? [];
    if (messages.length === 0) {
        running = false;
        showToast('Nu ai mesaje încărcate!', { key: 'warning' });
        return;
    }
    rebuildShuffle();
    while (running && !stopNow) {
        const msg = mutateMesaj(nextMessage());
        sendDiscordMessage(msg);
        const delay = Math.floor(Math.random() * 2000) + 1500;
        await sleep(delay);
    }
    running = false;
}

// ================================================================
// SETTINGS PAGE
// ================================================================
const { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } = RN;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e1f22', padding: 12 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    status: { color: '#b5bac1', fontSize: 13, marginBottom: 12 },
    statusRunning: { color: '#57f287' },
    row: { flexDirection: 'row', gap: 8, marginBottom: 10 },
    btn: { flex: 1, borderRadius: 8, padding: 12, alignItems: 'center' },
    btnGreen: { backgroundColor: '#2d7d46' },
    btnRed: { backgroundColor: '#da373c' },
    btnBlue: { backgroundColor: '#5865f2' },
    btnGray: { backgroundColor: '#4e4f58' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    input: {
        backgroundColor: '#2b2d31', color: '#dcddde',
        borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 14,
    },
    sectionTitle: { color: '#b5bac1', fontSize: 13, marginBottom: 6, marginTop: 8 },
    msgCount: { color: '#57f287', fontSize: 13, marginBottom: 8 },
    output: { backgroundColor: '#111214', borderRadius: 8, padding: 10, marginTop: 8, minHeight: 40 },
    outputText: { color: '#57f287', fontFamily: 'monospace', fontSize: 12 },
});

function MacroSettings() {
    const [isRunning, setIsRunning] = React.useState(running);
    const [url, setUrl] = React.useState('');
    const [output, setOutput] = React.useState('');
    const msgCount = (storage.messages as string[])?.length ?? 0;

    function toggleMacro() {
        if (running) {
            stopNow = true;
            running = false;
            setIsRunning(false);
            showToast('Macro oprit', { key: 'info' });
        } else {
            stopNow = false;
            running = true;
            autocorrectEnabled = false;
            setIsRunning(true);
            showToast('Macro pornit', { key: 'success' });
            macroLoop().then(() => setIsRunning(false));
        }
    }

    function loadFromURL() {
        if (!url.trim().startsWith('http')) {
            setOutput('❌ URL invalid');
            return;
        }
        fetch(url.trim())
            .then(r => r.text())
            .then(text => {
                const msgs = splitMessages(text);
                if (msgs.length === 0) { setOutput('❌ Nu s-au găsit mesaje'); return; }
                storage.messages = msgs;
                trimiseDeja.clear();
                rebuildShuffle();
                setOutput(`✓ ${msgs.length} mesaje încărcate`);
                showToast(`${msgs.length} mesaje încărcate!`, { key: 'success' });
            })
            .catch(() => setOutput('❌ Eroare la fetch URL'));
    }

    function clearMessages() {
        storage.messages = [];
        trimiseDeja.clear();
        shuffledIndices = [];
        setOutput('✓ Mesaje șterse');
    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>⚡ Macro + AutoCorrect</Text>

            <Text style={[styles.status, isRunning && styles.statusRunning]}>
                Status: {isRunning ? '🟢 Pornit' : '🔴 Oprit'}
            </Text>

            <Text style={styles.msgCount}>
                Mesaje încărcate: {msgCount}
            </Text>

            <TouchableOpacity
                style={[styles.btn, isRunning ? styles.btnRed : styles.btnGreen, { marginBottom: 10 }]}
                onPress={toggleMacro}
            >
                <Text style={styles.btnText}>{isRunning ? '⏹ Stop Macro' : '▶ Start Macro'}</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Încarcă mesaje din URL</Text>
            <TextInput
                style={styles.input}
                placeholder="https://raw.githubusercontent.com/..."
                placeholderTextColor="#6d6f78"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.row}>
                <TouchableOpacity style={[styles.btn, styles.btnBlue]} onPress={loadFromURL}>
                    <Text style={styles.btnText}>🌐 Load URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnGray]} onPress={clearMessages}>
                    <Text style={styles.btnText}>🗑 Clear</Text>
                </TouchableOpacity>
            </View>

            {output !== '' && (
                <View style={styles.output}>
                    <Text style={styles.outputText}>{output}</Text>
                </View>
            )}
        </ScrollView>
    );
}

// ================================================================
// AUTOCORRECT PATCH
// ================================================================
const patches: (() => void)[] = [];

function setupAutocorrect() {
    try {
        const MessageActions = findByProps('sendMessage', 'editMessage');
        if (!MessageActions) return;

        patches.push((() => {
            const orig = MessageActions.sendMessage.bind(MessageActions);
            MessageActions.sendMessage = function(channelId: string, message: any, ...args: any[]) {
                if (autocorrectEnabled && message?.content) {
                    let content: string = message.content;
                    const result = findMatch(content, false);
                    if (result) {
                        const { phrase, corrected, crossLine, matchLen } = result;
                        const len = crossLine ? matchLen! : phrase.length;
                        content = content.slice(0, content.length - len) + corrected;
                        message = { ...message, content };
                    }
                }
                return orig(channelId, message, ...args);
            };
            return () => { MessageActions.sendMessage = orig; };
        })());
    } catch (e) {
        console.error('[AutoCorrect] patch error:', e);
    }
}

export default {
    settings: MacroSettings,

    onLoad() {
        setupAutocorrect();
    },

    onUnload() {
        running = false;
        stopNow = true;
        patches.forEach(p => p?.());
        patches.length = 0;
    },
};
