import { React, ReactNative as RN } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";

const { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } = RN;

storage.scripts ??= [];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1e1f22", padding: 12 },
    title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12 },
    editor: {
        backgroundColor: "#2b2d31",
        color: "#dcddde",
        borderRadius: 8,
        padding: 10,
        fontFamily: "monospace",
        fontSize: 13,
        minHeight: 150,
        textAlignVertical: "top",
        marginBottom: 8,
    },
    nameInput: {
        backgroundColor: "#2b2d31",
        color: "#dcddde",
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        fontSize: 14,
    },
    row: { flexDirection: "row", gap: 8, marginBottom: 12 },
    btn: { flex: 1, borderRadius: 8, padding: 10, alignItems: "center" },
    btnRun: { backgroundColor: "#5865f2" },
    btnSave: { backgroundColor: "#2d7d46" },
    btnUpload: { backgroundColor: "#4e4f58" },
    btnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    scriptItem: {
        backgroundColor: "#2b2d31",
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    scriptName: { color: "#fff", fontSize: 14, flex: 1 },
    scriptBtns: { flexDirection: "row", gap: 6 },
    smallBtn: { borderRadius: 6, padding: 6 },
    smallBtnRun: { backgroundColor: "#5865f2" },
    smallBtnDel: { backgroundColor: "#da373c" },
    smallBtnText: { color: "#fff", fontSize: 12 },
    output: {
        backgroundColor: "#111214",
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
        minHeight: 60,
    },
    outputText: { color: "#57f287", fontFamily: "monospace", fontSize: 12 },
    sectionTitle: { color: "#b5bac1", fontSize: 13, marginBottom: 6, marginTop: 4 },
});

function runScript(code: string): string {
    try {
        const result = eval(code);
        return result !== undefined ? String(result) : "✓ Done";
    } catch (e: any) {
        return "❌ " + e.message;
    }
}

function JSRunnerPage() {
    const [code, setCode] = React.useState("");
    const [name, setName] = React.useState("");
    const [output, setOutput] = React.useState("");
    const [scripts, setScripts] = React.useState<{ name: string; code: string }[]>(storage.scripts ?? []);

    function handleRun() {
        const result = runScript(code);
        setOutput(result);
    }

    function handleSave() {
        if (!name.trim()) { showToast("Pune un nume!", { key: "warning" }); return; }
        if (!code.trim()) { showToast("Codul e gol!", { key: "warning" }); return; }
        const newScripts = [...scripts, { name: name.trim(), code }];
        storage.scripts = newScripts;
        setScripts(newScripts);
        setName("");
        showToast("Salvat!", { key: "success" });
    }

    function handleDelete(idx: number) {
        const newScripts = scripts.filter((_, i) => i !== idx);
        storage.scripts = newScripts;
        setScripts(newScripts);
    }

    function handleLoad(idx: number) {
        setCode(scripts[idx].code);
        setName(scripts[idx].name);
    }

    function handleUpload() {
        // Deschidem un prompt ca sa cerem URL-ul unui fisier JS hostat
        // Pe React Native nu avem file picker nativ fara permisiuni extra
        // Alternativa: citim dintr-un URL (paste link la fisier raw)
        const DocumentPicker = (globalThis as any).nativeModuleProxy?.DocumentPicker;
        if (!DocumentPicker) {
            // Fallback: prompt cu URL
            showToast("Paste URL-ul fisierului JS in campul de nume si dai Load URL", { key: "info" });
            return;
        }
        DocumentPicker.pick({ type: ["text/javascript", "text/plain"] })
            .then((res: any) => {
                const uri = res[0]?.uri;
                if (!uri) return;
                fetch(uri)
                    .then(r => r.text())
                    .then(text => {
                        setCode(text);
                        const fname = res[0]?.name ?? "uploaded";
                        setName(fname.replace(/\.[^.]+$/, ""));
                        showToast("Fișier încărcat!", { key: "success" });
                    })
                    .catch(() => showToast("Nu am putut citi fișierul", { key: "danger" }));
            })
            .catch(() => {});
    }

    function handleLoadURL() {
        // Incarca codul de la un URL raw (ex: raw.githubusercontent.com/...)
        if (!name.trim().startsWith("http")) {
            showToast("Pune un URL in campul de nume!", { key: "warning" });
            return;
        }
        fetch(name.trim())
            .then(r => r.text())
            .then(text => {
                setCode(text);
                showToast("Incarcat de la URL!", { key: "success" });
            })
            .catch(() => showToast("Nu am putut incarca URL-ul", { key: "danger" }));
    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>🧪 JS Runner</Text>
            <TextInput
                style={styles.nameInput}
                placeholder="Nume script sau URL pentru Load URL..."
                placeholderTextColor="#6d6f78"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.editor}
                multiline
                placeholder="// Scrie JS aici..."
                placeholderTextColor="#6d6f78"
                value={code}
                onChangeText={setCode}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.row}>
                <TouchableOpacity style={[styles.btn, styles.btnRun]} onPress={handleRun}>
                    <Text style={styles.btnText}>▶ Run</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={handleSave}>
                    <Text style={styles.btnText}>💾 Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.btn, styles.btnUpload]} onPress={handleUpload}>
                    <Text style={styles.btnText}>📁 Upload fișier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnUpload]} onPress={handleLoadURL}>
                    <Text style={styles.btnText}>🌐 Load URL</Text>
                </TouchableOpacity>
            </View>
            {output !== "" && (
                <View style={styles.output}>
                    <Text style={styles.outputText}>{output}</Text>
                </View>
            )}
            {scripts.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Scripturi salvate</Text>
                    {scripts.map((s, i) => (
                        <View key={i} style={styles.scriptItem}>
                            <Text style={styles.scriptName}>{s.name}</Text>
                            <View style={styles.scriptBtns}>
                                <TouchableOpacity style={[styles.smallBtn, styles.smallBtnRun]} onPress={() => handleLoad(i)}>
                                    <Text style={styles.smallBtnText}>📂</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.smallBtn, styles.smallBtnRun]} onPress={() => { setCode(s.code); setOutput(runScript(s.code)); }}>
                                    <Text style={styles.smallBtnText}>▶</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.smallBtn, styles.smallBtnDel]} onPress={() => handleDelete(i)}>
                                    <Text style={styles.smallBtnText}>🗑</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </>
            )}
        </ScrollView>
    );
}

export default {
    settings: JSRunnerPage,
};
