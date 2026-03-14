import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

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

function findMatch(textBefore: string, allowPrefixSkip: boolean): { phrase: string; corrected: string } | null {
    const lines = textBefore.split('\n');
    const lastLine = lines[lines.length - 1];
    const words = lastLine.split(' ');
    for (let n = Math.min(3, words.length); n >= 1; n--) {
        const phrase = words.slice(words.length - n).join(' ');
        const corrected = applyCorrection(phrase);
        if (corrected !== null) {
            if (allowPrefixSkip && isPrefixOfLongerKey(phrase)) continue;
            return { phrase, corrected };
        }
    }
    return null;
}

// Map de ref-uri active: instanta componenta -> setter
const activeRefs = new Map<any, (text: string) => void>();

const patches: (() => void)[] = [];

export default {
    onLoad() {
        try {
            const TextInputModule = findByProps('onChange', 'onChangeText');
            if (!TextInputModule) return;

            // Patch onChangeText
            patches.push(after('onChangeText', TextInputModule, function(this: any, [text]: [string], ret) {
                // Nu facem nimic aici, doar interceptam
                return ret;
            }));

            // Cel mai bun mod: patch pe clasa nativa AndroidTextInput / RCTTextField
            // folosim o abordare diferita - patch pe render cu wrapper
            const RN = (global as any).vendetta?.metro?.common?.ReactNative ?? require('react-native');
            const origTextInput = RN?.TextInput;
            if (!origTextInput) return;

            const origRender = origTextInput.prototype?.render ?? origTextInput.render;
            if (!origRender) return;

            patches.push(after('render', origTextInput.prototype ?? origTextInput, function(this: any, _args, ret) {
                if (!ret?.props) return ret;

                const origOnChangeText = ret.props.onChangeText;
                if (!origOnChangeText) return ret;

                ret.props.onChangeText = (text: string) => {
                    const result = findMatch(text, true);
                    if (result) {
                        const { phrase, corrected } = result;
                        const newText = text.slice(0, text.length - phrase.length) + corrected;
                        origOnChangeText(newText);
                        return;
                    }
                    origOnChangeText(text);
                };

                return ret;
            }));

        } catch (err) {
            console.error('[AutoCorrect] onLoad error:', err);
        }
    },

    onUnload() {
        patches.forEach(p => p?.());
        patches.length = 0;
    },
};
