(function(exports,common,metro,plugin,toasts){'use strict';plugin.storage.messages ??= [];
plugin.storage.running ??= false;
const wordsMap = {
  "pjs": "pis",
  "ya": "ta",
  "rs": "ra",
  "tm": "mt",
  "ois": "pis",
  "ojs": "pis",
  "sma": "sa\nma",
  "sama": "sa\nma",
  "petn": "pe\ntn",
  "pks": "pis",
  "oks": "pis",
  "mr": "mt",
  "ri": "ti",
  "spe": "si\npe",
  "tj": "tn",
  "ea": "ra",
  "cape": "cac\npe",
  "iah": "iau",
  "di": "si",
  "fuy": "fut",
  "vac": "cac",
  "vav": "cac",
  "sata": "sa\nta",
  "sta": "sa\nta",
  "tasa": "ta\nsa",
  "lis": "pis",
  "ms": "ma",
  "mari": "ma\nti",
  "pja": "pis",
  "pipe": "pis\npe",
  "puspe": "pis\npe",
  "ous": "pis",
  "rn": "tn",
  "dw": "de",
  "cax": "cac",
  "xac": "cac",
  "aa": "sa",
  "pus": "pis",
  "xax": "cac",
  "ran": "fan",
  "dan": "fan",
  "oau": "pis",
  "us": "pis",
  "oe": "pe",
  "marj": "ma\nti",
  "gi": "ti",
  "ds": "ra",
  "rj": "ti",
  "rssa": "ra\nsa",
  "essa": "ra\nsa",
  "rada": "ra\nsa",
  "ma cac": "ma\ncac",
  "ma pis": "ma\npis",
  "maa": "ma",
  "saa": "sa",
  "fn": "tn",
  "pispe": "pis\npe",
  "cacpe": "cac\npe",
  "pw": "pe",
  "le": "pe",
  "tb": "tn",
  "da": "ra",
  "mpis": "ma\npis",
  "za": "sa",
  "so": "si",
  "can": "fan",
  "sipe": "si\npe",
  "macac": "ma\ncac",
  "mapis": "ma\npis",
  "fug": "fut",
  "sk": "si",
  "ljs": "pis",
  "pmr": "pe\nmt",
  "pe mr": "pe\nmt",
  "pemt": "pe\nmt",
  "pe mt": "pe\nmt",
  "pe tn": "pe\ntn",
  "pr": "pe",
  "per": "pe\nra",
  "pera": "pe\nra",
  "peta": "pe\nra",
  "sti": "ti",
  "tsi": "tn\nsi",
  "raa": "ra",
  "tide": "ti\nde",
  "rm": "tn",
  "st": "sa\nta",
  "mlis": "ma\npis",
  "pos": "pis",
  "pospe": "pis\npe",
  "pope": "pis\npe",
  "is": "pis",
  "tr": "te",
  "acc": "cac",
  "peea": "pe\nra",
  "sile": "si\npe",
  "sle": "si\npe",
  "dut": "fut",
  "pmt": "pe\nmt",
  "fanan": "fan",
  "fanam": "fan",
  "pms": "pis",
  "va": "ca",
  "fana": "fan",
  "taasa": "ta\nsa",
  "mam": "ma",
  "taza": "ta\nsa",
  "os": "si",
  "tos": "tn",
  "pia": "pis",
  "lia": "pis",
  "gj": "gu",
  "gra": "gu\nra",
  "lw": "pe",
  "tk": "ti",
  "sj": "si",
  "cqc": "cac",
  "poa": "pis",
  "nt": "mt",
  "saya": "sa\nta",
  "mw": "ma",
  "rk": "ti",
  "taa": "ta",
  "cale": "cac\npe",
  "mpjs": "ma\npis",
  "mai": "mt\nsi",
  "pipw": "pis\npe",
  "tw": "ta",
  "ama cac": "ama\ncac",
  "oispe": "pis\npe",
  "pw tn": "pe\ntn",
  "pwtn": "pe\ntn",
  "pw mt": "pe\nmt",
  "pwmt": "pe\nmt",
  "mljs": "ma\npis",
  "ow": "pe",
  "si pe": "si\npe",
  "maacc": "ma\ncac",
  "ai": "si",
  "th": "tn",
  "ohs": "pis",
  "mpia": "ma\npis",
  "acpe": "cac\npe",
  "accpe": "cac\npe",
  "vape": "cac\npe",
  "taaa": "ta\nsa",
  "letj": "pe\ntn",
  "cc": "cac",
  "pjpe": "pis\npe",
  "pe nr": "pe\ntn",
  "penr": "pe\ntn",
  "acca": "cac",
  "nr": "mt",
  "me": "ma",
  "pern": "pe\ntn",
  "petj": "pe\ntn",
  "pns": "pis",
  "caep": "cac\npe",
  "mcac": "ma\ncac",
  "sioe": "si\npe",
  "tnsi": "tn\nsi",
  "na": "ma",
  "caca": "cac",
  "piw": "pis",
  "fr": "ft",
  "ns": "ma",
  "oia": "pis"
};
const sortedKeys = Object.keys(wordsMap).sort(function(a, b) {
  return b.length - a.length;
});
const allKeysLower = sortedKeys.map(function(k) {
  return k.toLowerCase();
});
const crossLineKeys = sortedKeys.filter(function(k) {
  return k.includes("\n");
});
function isPrefixOfLongerKey(phrase) {
  const lower = phrase.toLowerCase();
  return allKeysLower.some(function(k) {
    return k.includes(" ") && k.startsWith(lower + " ");
  });
}
function applyCorrection(word) {
  if (!word)
    return null;
  const lower = word.toLowerCase();
  if (word === word.toUpperCase() && /[A-Z]/.test(word))
    return null;
  for (const key of sortedKeys) {
    if (lower === key.toLowerCase())
      return wordsMap[key];
  }
  return null;
}
function findMatch(textBefore, allowPrefixSkip) {
  for (const key of crossLineKeys) {
    const tail = textBefore.slice(-key.length);
    if (tail.toLowerCase() === key.toLowerCase()) {
      const word = textBefore.slice(-key.length);
      if (word === word.toUpperCase() && /[A-Z]/.test(word))
        continue;
      return {
        phrase: key,
        corrected: wordsMap[key],
        crossLine: true,
        matchLen: key.length
      };
    }
  }
  const lines = textBefore.split("\n");
  const lastLine = lines[lines.length - 1];
  const words = lastLine.split(" ");
  for (let n = Math.min(3, words.length); n >= 1; n--) {
    const phrase = words.slice(words.length - n).join(" ");
    const corrected = applyCorrection(phrase);
    if (corrected !== null) {
      if (allowPrefixSkip && isPrefixOfLongerKey(phrase))
        continue;
      return {
        phrase,
        corrected,
        crossLine: false
      };
    }
  }
  return null;
}
let running = false;
let stopNow = false;
let shuffledIndices = [];
let shufflePos = 0;
let autocorrectEnabled = true;
const trimiseDeja = /* @__PURE__ */ new Set();
const extraLetters = "aeiourstmn";
function splitMessages(text) {
  if (!text || !text.trim())
    return [];
  const lines = text.split("\n");
  const msgs = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === "" && current.length > 0) {
      msgs.push(current.join("\n"));
      current = [];
    } else if (line.trim() !== "") {
      current.push(line);
    }
  }
  if (current.length > 0)
    msgs.push(current.join("\n"));
  return msgs;
}
function rebuildShuffle() {
  const messages = plugin.storage.messages ?? [];
  shuffledIndices = messages.map(function(_, i) {
    return i;
  });
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [
      shuffledIndices[j],
      shuffledIndices[i]
    ];
  }
  shufflePos = 0;
}
function nextMessage() {
  const messages = plugin.storage.messages ?? [];
  if (shuffledIndices.length === 0)
    rebuildShuffle();
  if (shufflePos >= shuffledIndices.length)
    rebuildShuffle();
  return messages[shuffledIndices[shufflePos++]];
}
function mutateMesaj(msg) {
  const key = msg.trim();
  if (!trimiseDeja.has(key)) {
    trimiseDeja.add(key);
    return msg;
  }
  const lines = msg.split("\n");
  const eligibile = lines.map(function(l, i) {
    return {
      l: l.trim(),
      i
    };
  }).filter(function(x) {
    return x.l.length >= 2;
  });
  if (eligibile.length === 0)
    return msg;
  const ales = eligibile[Math.floor(Math.random() * eligibile.length)];
  const linie = ales.l;
  const pos = Math.floor(Math.random() * (linie.length + 1));
  const litera = extraLetters[Math.floor(Math.random() * extraLetters.length)];
  const linieNoua = linie.slice(0, pos) + litera + linie.slice(pos);
  const liniiNoi = [
    ...lines
  ];
  liniiNoi[ales.i] = linieNoua;
  return liniiNoi.join("\n");
}
function getCurrentChannelId() {
  try {
    const SelectedChannelStore = metro.findByProps("getChannelId", "getVoiceChannelId");
    return SelectedChannelStore?.getChannelId?.() ?? null;
  } catch {
    return null;
  }
}
function sendDiscordMessage(content) {
  try {
    const MessageActions = metro.findByProps("sendMessage", "_sendMessage");
    const channelId = getCurrentChannelId();
    if (!channelId || !MessageActions)
      return;
    MessageActions.sendMessage(channelId, {
      content
    });
  } catch (e) {
    console.error("[Macro] sendMessage error:", e);
  }
}
function sleep(ms) {
  return new Promise(function(r) {
    return setTimeout(r, ms);
  });
}
async function macroLoop() {
  const messages = plugin.storage.messages ?? [];
  if (messages.length === 0) {
    running = false;
    toasts.showToast("Nu ai mesaje \xEEnc\u0103rcate!", {
      key: "warning"
    });
    return;
  }
  rebuildShuffle();
  while (running && !stopNow) {
    const msg = mutateMesaj(nextMessage());
    sendDiscordMessage(msg);
    const delay = Math.floor(Math.random() * 2e3) + 1500;
    await sleep(delay);
  }
  running = false;
}
const { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } = common.ReactNative;
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
  status: {
    color: "#b5bac1",
    fontSize: 13,
    marginBottom: 12
  },
  statusRunning: {
    color: "#57f287"
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center"
  },
  btnGreen: {
    backgroundColor: "#2d7d46"
  },
  btnRed: {
    backgroundColor: "#da373c"
  },
  btnBlue: {
    backgroundColor: "#5865f2"
  },
  btnGray: {
    backgroundColor: "#4e4f58"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14
  },
  input: {
    backgroundColor: "#2b2d31",
    color: "#dcddde",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 14
  },
  sectionTitle: {
    color: "#b5bac1",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 8
  },
  msgCount: {
    color: "#57f287",
    fontSize: 13,
    marginBottom: 8
  },
  output: {
    backgroundColor: "#111214",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    minHeight: 40
  },
  outputText: {
    color: "#57f287",
    fontFamily: "monospace",
    fontSize: 12
  }
});
function MacroSettings() {
  const [isRunning, setIsRunning] = common.React.useState(running);
  const [url, setUrl] = common.React.useState("");
  const [output, setOutput] = common.React.useState("");
  const msgCount = plugin.storage.messages?.length ?? 0;
  function toggleMacro() {
    if (running) {
      stopNow = true;
      running = false;
      setIsRunning(false);
      toasts.showToast("Macro oprit", {
        key: "info"
      });
    } else {
      stopNow = false;
      running = true;
      autocorrectEnabled = false;
      setIsRunning(true);
      toasts.showToast("Macro pornit", {
        key: "success"
      });
      macroLoop().then(function() {
        return setIsRunning(false);
      });
    }
  }
  function loadFromURL() {
    if (!url.trim().startsWith("http")) {
      setOutput("\u274C URL invalid");
      return;
    }
    fetch(url.trim()).then(function(r) {
      return r.text();
    }).then(function(text) {
      const msgs = splitMessages(text);
      if (msgs.length === 0) {
        setOutput("\u274C Nu s-au g\u0103sit mesaje");
        return;
      }
      plugin.storage.messages = msgs;
      trimiseDeja.clear();
      rebuildShuffle();
      setOutput(`\u2713 ${msgs.length} mesaje \xEEnc\u0103rcate`);
      toasts.showToast(`${msgs.length} mesaje \xEEnc\u0103rcate!`, {
        key: "success"
      });
    }).catch(function() {
      return setOutput("\u274C Eroare la fetch URL");
    });
  }
  function clearMessages() {
    plugin.storage.messages = [];
    trimiseDeja.clear();
    shuffledIndices = [];
    setOutput("\u2713 Mesaje \u0219terse");
  }
  return /* @__PURE__ */ common.React.createElement(ScrollView, {
    style: styles.container,
    keyboardShouldPersistTaps: "handled"
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.title
  }, "\u26A1 Macro + AutoCorrect"), /* @__PURE__ */ common.React.createElement(Text, {
    style: [
      styles.status,
      isRunning && styles.statusRunning
    ]
  }, "Status: ", isRunning ? "\u{1F7E2} Pornit" : "\u{1F534} Oprit"), /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.msgCount
  }, "Mesaje \xEEnc\u0103rcate: ", msgCount), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      isRunning ? styles.btnRed : styles.btnGreen,
      {
        marginBottom: 10
      }
    ],
    onPress: toggleMacro
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, isRunning ? "\u23F9 Stop Macro" : "\u25B6 Start Macro")), /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.sectionTitle
  }, "\xCEncarc\u0103 mesaje din URL"), /* @__PURE__ */ common.React.createElement(TextInput, {
    style: styles.input,
    placeholder: "https://raw.githubusercontent.com/...",
    placeholderTextColor: "#6d6f78",
    value: url,
    onChangeText: setUrl,
    autoCapitalize: "none",
    autoCorrect: false
  }), /* @__PURE__ */ common.React.createElement(View, {
    style: styles.row
  }, /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnBlue
    ],
    onPress: loadFromURL
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u{1F310} Load URL")), /* @__PURE__ */ common.React.createElement(TouchableOpacity, {
    style: [
      styles.btn,
      styles.btnGray
    ],
    onPress: clearMessages
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.btnText
  }, "\u{1F5D1} Clear"))), output !== "" && /* @__PURE__ */ common.React.createElement(View, {
    style: styles.output
  }, /* @__PURE__ */ common.React.createElement(Text, {
    style: styles.outputText
  }, output)));
}
const patches = [];
function setupAutocorrect() {
  try {
    const MessageActions = metro.findByProps("sendMessage", "editMessage");
    if (!MessageActions)
      return;
    patches.push(function() {
      const orig = MessageActions.sendMessage.bind(MessageActions);
      MessageActions.sendMessage = function(channelId, message, ...args) {
        if (autocorrectEnabled && message?.content) {
          let content = message.content;
          const result = findMatch(content, false);
          if (result) {
            const { phrase, corrected, crossLine, matchLen } = result;
            const len = crossLine ? matchLen : phrase.length;
            content = content.slice(0, content.length - len) + corrected;
            message = {
              ...message,
              content
            };
          }
        }
        return orig(channelId, message, ...args);
      };
      return function() {
        MessageActions.sendMessage = orig;
      };
    }());
  } catch (e) {
    console.error("[AutoCorrect] patch error:", e);
  }
}
var index = {
  settings: MacroSettings,
  onLoad() {
    setupAutocorrect();
  },
  onUnload() {
    running = false;
    stopNow = true;
    patches.forEach(function(p) {
      return p?.();
    });
    patches.length = 0;
  }
};exports.default=index;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta.metro.common,vendetta.metro,vendetta.plugin,vendetta.ui.toasts);