(function(exports,common,toasts,plugin){'use strict';const { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } = common.ReactNative;
plugin.storage.scripts ??= [];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1f22",
    padding: 12
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },
  editor: {
    backgroundColor: "#2b2d31",
    color: "#dcddde",
    borderRadius: 8,
    padding: 10,
    fontFamily: "monospace",
    fontSize: 13,
    minHeight: 150,
    textAlignVertical: "top",
    marginBottom: 8
  },
  nameInput: {
    backgroundColor: "#2b2d31",
    color: "#dcddde",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 14
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center"
  },
  btnRun: {
    backgroundColor: "#5865f2"
  },
  btnSave: {
    backgroundColor: "#2d7d46"
  },
  btnUpload: {
    backgroundColor: "#4e4f58"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14
  },
  scriptItem: {
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  scriptName: {
    color: "#fff",
    fontSize: 14,
    flex: 1
  },
  scriptBtns: {
    flexDirection: "row",
    gap: 6
  },
  smallBtn: {
    borderRadius: 6,
    padding: 6
  },
  smallBtnRun: {
    backgroundColor: "#5865f2"
  },
  smallBtnDel: {
    backgroundColor: "#da373c"
  },
  smallBtnText: {
    color: "#fff",
    fontSize: 12
  },
  output: {
    backgroundColor: "#111214",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    minHeight: 60
  },
  outputText: {
    color: "#57f287",
    fontFamily: "monospace",
    fontSize: 12
  },
  sectionTitle: {
    color: "#b5bac1",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 4
  }
});
function runScript(code) {
  try {
    const result = eval(code);
    return result !== void 0 ? String(result) : "\u2713 Done";
  } catch (e) {
    return "\u274C " + e.message;
  }
}
function JSRunnerPage() {
  const [code2, setCode] = common.React.useState("");
  const [name, setName] = common.React.useState("");
  const [output, setOutput] = common.React.useState("");
  const [scripts, setScripts] = common.React.useState(plugin.storage.scripts ?? []);
  function handleRun() {
    const result2 = runScript(code2);
    setOutput(result2);
  }
  function handleSave() {
    if (!name.trim()) {
      toasts.showToast("Pune un nume!", {
        key: "warning"
      });
      return;
    }
    if (!code2.trim()) {
      toasts.showToast("Codul e gol!", {
        key: "warning"
      });
      return;
    }
    const newScripts = [
      ...scripts,
      {
        name: name.trim(),
        code: code2
      }
    ];
    plugin.storage.scripts = newScripts;
    setScripts(newScripts);
    setName("");
    toasts.showToast("Salvat!", {
      key: "success"
    });
  }
  function handleDelete(idx) {
    const newScripts = scripts.filter(function(_, i) {
      return i !== idx;
    });
    plugin.storage.scripts = newScripts;
    setScripts(newScripts);
  }
  function handleLoad(idx) {
    setCode(scripts[idx].code);
    setName(scripts[idx].name);
  }
  function handleUpload() {
    const DocumentPicker = globalThis.nativeModuleProxy?.DocumentPicker;
    if (!DocumentPicker) {
      toasts.showToast("Paste URL-ul fisierului JS in campul de nume si dai Load URL", {
        key: "info"
      });
      return;
    }
    DocumentPicker.pick({
      type: [
        "text/javascript",
        "text/plain"
      ]
    }).then(function(res) {
      const uri = res[0]?.uri;
      if (!uri)
        return;
      fetch(uri).then(function(r) {
        return r.text();
      }).then(function(text) {
        setCode(text);
        const fname = res[0]?.name ?? "uploaded";
        setName(fname.replace(/\.[^.]+$/, ""));
        toasts.showToast("Fi\u0219ier \xEEnc\u0103rcat!", {
          key: "success"
        });
      }).catch(function() {
        return toasts.showToast("Nu am putut citi fi\u0219ierul", {
          key: "danger"
        });
      });
    }).catch(function() {
    });
  }
  function handleLoadURL() {
    if (!name.trim().startsWith("http")) {
      toasts.showToast("Pune un URL in campul de nume!", {
        key: "warning"
      });
      return;
    }
    fetch(name.trim()).then(function(r) {
      return r.text();
    }).then(function(text) {
      setCode(text);
      toasts.showToast("Incarcat de la URL!", {
        key: "success"
      });
    }).catch(function() {
      return toasts.showToast("Nu am putut incarca URL-ul", {
        key: "danger"
      });
    });
  }
  return /* @__PURE__ */ common.React.createElement(ScrollView, {
    style: styles.container,
    keyboardShouldPersistTaps: "handled"
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.title
  }, "\u{1F9EA} JS Runner"), /* @__PURE__ */ common.React.createElement(TextInput, {
    style: styles.nameInput,
    placeholder: "Nume script sau URL pentru Load URL...",
    placeholderTextColor: "#6d6f78",
    value: name,
    onChangeText: setName
  }), /* @__PURE__ */ common.React.createElement(TextInput, {
    style: styles.editor,
    multiline: true,
    placeholder: "// Scrie JS aici...",
    placeholderTextColor: "#6d6f78",
    value: code2,
    onChangeText: setCode,
    autoCapitalize: "none",
    autoCorrect: false
  }), /* @__PURE__ */ common.React.createElement(View, {
    style: styles.row
  }, /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnRun
    ],
    onPress: handleRun
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u25B6 Run")), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnSave
    ],
    onPress: handleSave
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u{1F4BE} Save"))), /* @__PURE__ */ common.React.createElement(View, {
    style: styles.row
  }, /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnUpload
    ],
    onPress: handleUpload
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u{1F4C1} Upload fi\u0219ier")), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnUpload
    ],
    onPress: handleLoadURL
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u{1F310} Load URL"))), output !== "" && /* @__PURE__ */ common.React.createElement(View, {
    style: styles.output
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.outputText
  }, output)), scripts.length > 0 && /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.sectionTitle
  }, "Scripturi salvate"), scripts.map(function(s, i) {
    return /* @__PURE__ */ common.React.createElement(View, {
      key: i,
      style: styles.scriptItem
    }, /* @__PURE__ */ common.React.createElement(Text, {
      style: styles.scriptName
    }, s.name), /* @__PURE__ */ common.React.createElement(View, {
      style: styles.scriptBtns
    }, /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
      style: [
        styles.smallBtn,
        styles.smallBtnRun
      ],
      onPress: function() {
        return handleLoad(i);
      }
    }, /* @__PURE__ */ common.React.createElement(Text, {
      style: styles.smallBtnText
    }, "\u{1F4C2}")), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
      style: [
        styles.smallBtn,
        styles.smallBtnRun
      ],
      onPress: function() {
        setCode(s.code);
        setOutput(runScript(s.code));
      }
    }, /* @__PURE__ */ common.React.createElement(Text, {
      style: styles.smallBtnText
    }, "\u25B6")), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
      style: [
        styles.smallBtn,
        styles.smallBtnDel
      ],
      onPress: function() {
        return handleDelete(i);
      }
    }, /* @__PURE__ */ common.React.createElement(Text, {
      style: styles.smallBtnText
    }, "\u{1F5D1}"))));
  })));
}
var index = {
  settings: JSRunnerPage
};exports.default=index;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta.metro.common,vendetta.ui.toasts,vendetta.plugin);