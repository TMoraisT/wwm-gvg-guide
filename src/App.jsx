import React, { useState } from "react";

const builds = [
  {
    id: "healer",
    rank: 1,
    role: "🌸 Curador Principal",
    priority: "ESSENCIAL",
    priorityColor: "#e8c97e",
    count: 7,
    weapons: "Panacea Fan + Soulshade Umbrella",
    path: "Silkbind – Jade",
    summary:
      "A build mais crítica do GVG. Sem healers suficientes, o time colapsa em segundos nos teamfights de 30v30. A Panacea Fan revive aliados e cura em AoE; o Soulshade Umbrella cura passivamente o aliado com menos HP e aumenta o dano do time em 15%.",
    innerWays: [
      { name: "Royal Remedy", desc: "Aumenta efetividade do clone de água em 10% e reduz o custo de Dew para reviver à metade no Tier 4." },
      { name: "Restoring Blossom", desc: "Aplica buff Nurturing — +2% de cura recebida por crit heal, até 3 stacks." },
      { name: "Esoteric Revival", desc: "Aumenta a HP com que aliados revivem. Imprescindível para manter o time em pé após wipes parciais." },
      { name: "Mending Loom", desc: "Melhora Echoes of a Thousand Petals: restaura 5 Dew e cura 10% do Max HP ao consumir 100 Dew. No Tier 6, cura você E o aliado com menos HP." },
    ],
    mysticSkills: [
      { name: "Lion's Roar (O Sino)", desc: "OBRIGATÓRIO. Silencia inimigos em área. Inimigo silenciado não usa skills nem escapa." },
      { name: "Floating Grace", desc: "Aumenta dano do time em 15%. Sempre ative no início do fight." },
      { name: "Cloudburst Healing", desc: "Heal AoE emergencial para estabilizar o time em clashes pesados." },
    ],
    gear: [
      { name: "Set Silkbind-Deluge", desc: "Maximiza output de cura. Prioridade absoluta para healers." },
      { name: "Set Rainwhisper (secundário)", desc: "Aumenta survivability do healer — bom se ficar sendo focado." },
    ],
    attributes: ["Agility → escala Min Physical Attack (armas Silkbind)", "Max HP → heals escalam com HP do curador", "Silkbind Attack nas subs"],
    gvgRole: "Ficar na retaguarda do grupo principal. Nunca avançar sozinho. Prioridade é manter tanks e DPS vivos.",
  },
  {
    id: "tank",
    rank: 2,
    role: "🛡️ Tank / Frontline",
    priority: "ESSENCIAL",
    priorityColor: "#e8c97e",
    count: 4,
    weapons: "Thundercry Blade + Stormbreaker Spear",
    path: "Stonesplit – Might",
    summary:
      "O muro da guild. O Thundercry Blade gera escudos baseados no Max HP e atordoa grupos; o Stormbreaker Spear aplica Vulnerabilidade (+10% dano sofrido) e reduz o dano recebido em 40% com Storm Roar. Segurar a linha e provocar é a missão.",
    innerWays: [
      { name: "Morale Chant", desc: "80% de chance de ganhar +1% de dano por hit (até 5 stacks). Essencial mesmo em builds de tank." },
      { name: "Battle Anthem", desc: "Aumenta dano de charged skills. Sinergiza com Fury Spear, que já tem Fortitude embutido." },
      { name: "Golden Body", desc: "Botão de pânico: redução de dano massiva. Use quando não puder esquivar." },
      { name: "Art of Resistance", desc: "Escudos duram mais. Alternativa: Trapped Beast — gera escudo quando HP cai baixo." },
    ],
    mysticSkills: [
      { name: "Lion's Roar (O Sino)", desc: "Silêncio em AoE. Tanks na linha de frente têm o melhor ângulo para usar." },
      { name: "Serene Breeze", desc: "OBRIGATÓRIO no GVG. Quebra CC e reposiciona. Sem isso, você morre travado." },
      { name: "Dragon's Breath + Drunken Poet", desc: "Aplica Burn e converte em spike de burst. Use após execução para maximizar dano." },
    ],
    gear: [
      { name: "Set Rainwhisper + Formbend", desc: "Rainwhisper aumenta crit damage com escudo ativo. Formbend gera mais escudos em combos." },
      { name: "Moonflare (alternativo ao Formbend)", desc: "Use até Formbend estar disponível." },
    ],
    attributes: ["Max HP → base para escudos do Thundercry Blade", "Body → gera Fighting Spirit mais rápido", "Fortitude → resistência a CC"],
    gvgRole: "Linha de frente do mid lane. Use Storm Roar para taunt, mantenha Vulnerabilidade aplicada. Não persiga — segure posição.",
  },
  {
    id: "maindps",
    rank: 3,
    role: "⚔️ DPS Principal (Mid Lane)",
    priority: "ALTO",
    priorityColor: "#a8c4e0",
    count: 8,
    weapons: "Strategic Sword + Nameless Spear",
    path: "Bellstrike – Splendor / Bamboocut",
    summary:
      "O meta de DPS no GVG. A Strategic Sword aplica Bleed em stack (DoT devastador em teamfights prolongados) e a Nameless Spear adiciona CC e pressão de longa distância. Controla o ritmo da luta e desgasta tanks inimigos.",
    innerWays: [
      { name: "Sword Horizon", desc: "Permite pressionar o botão de skill uma segunda vez para Crosswind Blade follow-up — dano massivo com bleed stacks." },
      { name: "Wolfchaser's Art", desc: "Heavenquaker/Nameless Spear ativa buffs com menos hits. Aplica 5 stacks de bleed mais rápido." },
      { name: "Fivefold Bleed", desc: "Todos os ataques têm chance de aplicar bleed. No stack máximo, causa Piercing Damage enorme." },
      { name: "Morale Chant", desc: "Stack de dano passivo. Não existe build boa sem isso." },
    ],
    mysticSkills: [
      { name: "Lion's Roar", desc: "Combo de silêncio com o time. Time coordenado de Lion's Roar = wipe instantâneo." },
      { name: "Cloud Steps", desc: "Gap closer para manter pressão e perseguir alvos que tentam escapar." },
      { name: "Dragon's Breath", desc: "Burn + combo com Drunken Poet para spike de burst após execução." },
    ],
    gear: [
      { name: "Set Eaglerise", desc: "Bônus defensivo ao aplicar bleed (Eaglerise buff). Dá respiro para os healers." },
      { name: "Set Hawkwing (alternativo)", desc: "Aumenta dano crítico e sustain — bom para encontros mais longos." },
    ],
    attributes: ["Agility → escala dano físico (Bellstrike path)", "Dexterity → velocidade de ataque para aplicar bleed mais rápido", "Bleed Damage nas subs"],
    gvgRole: "Meio do time principal no mid. Foque inimigos marcados pelo tank. Nunca avance além dos tanks sem suporte.",
  },
  {
    id: "assassin",
    rank: 4,
    role: "🗡️ Assassino / Flex (Side Lanes)",
    priority: "ALTO",
    priorityColor: "#a8c4e0",
    count: 6,
    weapons: "Infernal Twinblades + Mortal Rope Dart",
    path: "Bamboocut – Wind",
    summary:
      "O terror dos healers. Mobilidade extrema + burst instantâneo. No GVG a missão é: farmar mobs dos side lanes para pontos, depois voltar para caçar healers e matar alvos isolados. A skill de Nullify Healing é o counter absoluto ao sustain inimigo.",
    innerWays: [
      { name: "Blazing Wrath", desc: "Nó tardio da árvore. Desbloqueado com investimento profundo. Transforma Twinblades em burst máximo." },
      { name: "Morale Chant", desc: "Stacks de dano constantes. Excelente para assassinos que hit-and-run." },
      { name: "Sword Horizon / Bamboocut passivos", desc: "Melhora mobilidade e janelas de burst da Rope Dart." },
      { name: "Fivefold Bleed", desc: "Aplicar bleed enquanto persegue amplifica o dano mesmo ao sair de combate." },
    ],
    mysticSkills: [
      { name: "Nullify Healing (Twinblades Z)", desc: "OBRIGATÓRIO no GVG. Cancela toda cura inimiga. Combine com o vacuum do Mo Blade para wipe instantâneo." },
      { name: "Cloud Steps", desc: "Mobilidade. Essencial para fugir, perseguir e chegar ao backline inimigo." },
      { name: "Serene Breeze", desc: "Quebra CC para não ser preso enquanto assassina." },
    ],
    gear: [
      { name: "Set Eaglerise", desc: "Dano extra com bleed ativo. Perfeito para assassinos de burst." },
      { name: "Foco em Critical Damage", desc: "A build só funciona com crit alto. Priorize em todas as subs." },
    ],
    attributes: ["Agility → DPS e velocidade de ataque", "Critical Rate e Critical Damage nas subs", "Speed / Movement Speed para perseguição"],
    gvgRole: "Dividir em 2 grupos de 3 nos side lanes. Farmar mobs → comprar buffs → flanquear backline inimigo nos clashes grandes.",
  },
  {
    id: "duelist",
    rank: 5,
    role: "🏆 Duelista (10min Duel)",
    priority: "CRÍTICO",
    priorityColor: "#e05050",
    count: 1,
    weapons: "Nameless Sword (especialista)",
    path: "Bellstrike – Splendor",
    summary:
      "Aos 10 minutos, ocorre um duelo 1v1 obrigatório. Vencer = -20% defesa no Goose inimigo + torres perdem 60% do HP. É o momento mais decisivo da partida. O melhor jogador da guild deve jogar esta build e treinar especificamente para o duelo.",
    innerWays: [
      { name: "Morale Chant", desc: "DPS passivo em 1v1 é decisivo — cada % de dano conta." },
      { name: "Art of Resistance", desc: "Escudo dura mais. Nameless Sword gera escudo massivo para o raid E para si." },
      { name: "Battle Anthem", desc: "Amplifica charged attacks — as janelas de burst mais seguras do 1v1." },
      { name: "Sword Horizon", desc: "Follow-up de Crosswind Blade após skills. Maximiza o burst nas janelas certas." },
    ],
    mysticSkills: [
      { name: "Lion's Roar", desc: "Silência o oponente em momento decisivo. Timing é tudo." },
      { name: "Serene Breeze", desc: "Quebra CC. Sem isso você morre preso nas combos do adversário." },
      { name: "Cloud Steps", desc: "Mobilidade para reposicionar e escapar de situações ruins." },
    ],
    gear: [
      { name: "Melhor gear disponível", desc: "O duelista deve ter o melhor investimento de gear da guild." },
      { name: "Set Rainwhisper + Moonflare", desc: "Escudo + crit damage. Maximiza a janela de burst da Nameless Sword." },
    ],
    attributes: ["Agility → escala todos os ataques da Nameless Sword", "Max HP → escudo da habilidade especial (tecla Z) escala com HP", "Critical Damage nas subs"],
    gvgRole: "Aguarda o duel na posição. Não entra em teamfight antes. Durante o duel, o resto do time mantém posição no mid.",
  },
  {
    id: "cc",
    rank: 6,
    role: "🌀 Controle / Suporte DPS",
    priority: "MÉDIO",
    priorityColor: "#7ec4a8",
    count: 4,
    weapons: "Heavenquaker Spear + Strategic Sword",
    path: "Silkbind – Jade / Bellstrike",
    summary:
      "Build de controle e bleed para teamfights prolongados. Heavenquaker Spear limpa grupos de mobs rapidamente e aplica CC em área. Em GVG, serve para sustentar pressão no mid lane enquanto os assassinos trabalham nos flancos.",
    innerWays: [
      { name: "Wolfchaser's Art", desc: "Ativa buffs da Heavenquaker com menos hits. 5 stacks de bleed muito mais rápido." },
      { name: "Fivefold Bleed", desc: "Bleed em todos os ataques. Devastador em teamfights com muitos inimigos próximos." },
      { name: "Morale Chant", desc: "Dano passivo sempre ativo." },
      { name: "Battle Anthem", desc: "Amplifica charged attacks da Heavenquaker — o maior AoE da build." },
    ],
    mysticSkills: [
      { name: "Lion's Roar", desc: "Silêncio em AoE. Timing com o time para wipar grupos." },
      { name: "Guardian Palm", desc: "Agrupa inimigos para os charged attacks da Heavenquaker varrendo tudo." },
      { name: "Leaping Toad", desc: "CC + Poison + knockdown AoE. Excelente em teamfights densos." },
    ],
    gear: [
      { name: "Set Eaglerise", desc: "Buff defensivo ao aplicar bleed. Boa sustentabilidade." },
      { name: "Hawkwing (alternativo)", desc: "Para variante mais ofensiva." },
    ],
    attributes: ["Agility / Dexterity → velocidade e dano", "Bleed Damage + Piercing Damage nas subs", "AoE Range se disponível"],
    gvgRole: "Suporte ao DPS principal no mid lane. Prioridade em controlar grupos de inimigos. Não persiga — mantenha posição.",
  },
];

const groups = [
  {
    name: "Grupo A — Força Principal (Mid Lane)",
    color: "#e8c97e",
    players: 19,
    composition: [
      { role: "🛡️ Tanks", count: 4, desc: "Linha de frente, seguram aggro e aplicam Vulnerabilidade" },
      { role: "🌸 Healers", count: 7, desc: "Retaguarda, mantêm o time vivo nos clashes" },
      { role: "⚔️ DPS Principal", count: 8, desc: "Aplicam bleed e burst nos alvos marcados pelos tanks" },
    ],
    strategy: "Avança pelo mid lane em formação: Tanks na frente → DPS no meio → Healers atrás. Objetivo: destruir torres e chegar ao Goose inimigo. Coordenar Lion's Roar é o fator de vitória.",
  },
  {
    name: "Grupo B — Side Lane Esquerdo",
    color: "#a8c4e0",
    players: 3,
    composition: [
      { role: "🗡️ Assassinos", count: 3, desc: "Farmar mobs, comprar buffs, flanquear healers inimigos" },
    ],
    strategy: "Farmar todos os mobs do side lane para acumular Green Points. Comprar buff de anti-heal ou dano em torre. Flanquear o backline inimigo durante clashes grandes no mid.",
  },
  {
    name: "Grupo C — Side Lane Direito",
    color: "#a8c4e0",
    players: 3,
    composition: [
      { role: "🗡️ Assassinos", count: 3, desc: "Mesma função do Grupo B no lado oposto" },
    ],
    strategy: "Espelha o Grupo B. Um dos grupos pode ajudar o outro se um lado for dominado. Comunicação constante com o Commander.",
  },
  {
    name: "Grupo D — Controle / Suporte DPS",
    color: "#7ec4a8",
    players: 4,
    composition: [
      { role: "🌀 CC/Suporte DPS", count: 4, desc: "Pressão AoE, bleed em grupo, CC em teamfights densos" },
    ],
    strategy: "Fica logo atrás dos tanks no mid. Função de transição: controla inimigos que tentam furar a linha dos tanks e reforça o DPS principal nos teamfights críticos.",
  },
  {
    name: "Grupo E — Duelista",
    color: "#e05050",
    players: 1,
    composition: [
      { role: "🏆 Duelist", count: 1, desc: "Melhor jogador da guild — especialista em 1v1" },
    ],
    strategy: "Aguarda o duel dos 10 minutos. Não desperdiça stamina/HP antes. Após o duel (ganhar = -20% defesa no Goose + torres -60% HP), junta-se ao Grupo A para o push final.",
  },
];

export default function GVGGuide() {
  const [activeTab, setActiveTab] = useState("builds");
  const [expandedBuild, setExpandedBuild] = useState(null);

  return (
    <div style={{
      background: "#0d0c0a",
      minHeight: "100vh",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#d4c4a0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.04,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #c8a96e 40px, #c8a96e 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #c8a96e 40px, #c8a96e 41px)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center", padding: "48px 24px 32px",
        borderBottom: "1px solid #3a2e1a",
        background: "linear-gradient(180deg, #1a1208 0%, #0d0c0a 100%)",
        position: "relative",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "6px", color: "#7a6540", marginBottom: "12px", textTransform: "uppercase" }}>
          Where Winds Meet · Guia Tático
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "normal",
          color: "#e8c97e", margin: "0 0 8px",
          textShadow: "0 0 40px rgba(232,201,126,0.3)",
          letterSpacing: "2px",
        }}>
          ⚔️ Guia Completo de GVG ⚔️
        </h1>
        <div style={{ color: "#7a6540", fontSize: "14px", marginBottom: "20px" }}>
          30 Jogadores · 3 Lanes · Composição Meta
        </div>

        {/* Key numbers */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginTop: "24px" }}>
          {[
            { label: "Healers", val: "7", color: "#c97eb0" },
            { label: "Tanks", val: "4", color: "#e8c97e" },
            { label: "DPS Principal", val: "8", color: "#7ea8c4" },
            { label: "Assassinos", val: "6", color: "#c47e7e" },
            { label: "CC/Suporte", val: "4", color: "#7ec4a8" },
            { label: "Duelista", val: "1", color: "#e05050" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "11px", color: "#5a4e30", marginTop: "4px", letterSpacing: "2px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #2a2010", background: "#0f0e0b" }}>
        {[
          { id: "builds", label: "🗡️ Builds" },
          { id: "groups", label: "🏰 Grupos & Formação" },
          { id: "map", label: "🗺️ Mapa" },
          { id: "tips", label: "📜 Dicas GVG" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              flex: 1, padding: "14px 8px", border: "none", cursor: "pointer",
              background: activeTab === t.id ? "#1a1208" : "transparent",
              color: activeTab === t.id ? "#e8c97e" : "#5a4e30",
              borderBottom: activeTab === t.id ? "2px solid #e8c97e" : "2px solid transparent",
              fontSize: "13px", fontFamily: "inherit", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>

        {/* BUILDS TAB */}
        {activeTab === "builds" && (
          <div>
            {builds.map((b) => (
              <div key={b.id} style={{
                border: `1px solid #2a2010`,
                borderLeft: `3px solid ${b.priorityColor}`,
                marginBottom: "16px",
                background: "#0f0e0b",
                borderRadius: "2px",
                overflow: "hidden",
              }}>
                {/* Build header */}
                <div
                  onClick={() => setExpandedBuild(expandedBuild === b.id ? null : b.id)}
                  style={{
                    padding: "16px 20px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "12px", flexWrap: "wrap",
                    background: expandedBuild === b.id ? "#1a1208" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "200px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: b.priorityColor, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "14px", fontWeight: "bold",
                      color: "#0d0c0a", flexShrink: 0,
                    }}>#{b.rank}</div>
                    <div>
                      <div style={{ fontSize: "17px", color: "#d4c4a0", fontWeight: "bold" }}>{b.role}</div>
                      <div style={{ fontSize: "12px", color: "#5a4e30", marginTop: "2px" }}>{b.weapons}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{
                      padding: "3px 10px", border: `1px solid ${b.priorityColor}`,
                      color: b.priorityColor, fontSize: "10px", letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}>{b.priority}</span>
                    <span style={{
                      background: "#1a1208", border: "1px solid #2a2010",
                      padding: "3px 10px", fontSize: "12px", color: "#7a6540",
                    }}>×{b.count} jogadores</span>
                    <span style={{ color: "#5a4e30", fontSize: "18px" }}>{expandedBuild === b.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Summary always visible */}
                <div style={{ padding: "0 20px 16px", borderTop: "1px solid #1a1208" }}>
                  <p style={{ margin: "12px 0 0", fontSize: "14px", color: "#8a7a58", lineHeight: "1.7", fontStyle: "italic" }}>
                    {b.summary}
                  </p>
                </div>

                {/* Expanded details */}
                {expandedBuild === b.id && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "8px" }}>

                      {/* Inner Ways */}
                      <Section title="🧿 Inner Ways" color="#c97eb0">
                        {b.innerWays.map(iw => (
                          <Item key={iw.name} name={iw.name} desc={iw.desc} color="#c97eb0" />
                        ))}
                      </Section>

                      {/* Mystic Skills */}
                      <Section title="✨ Mystic Skills" color="#7ea8c4">
                        {b.mysticSkills.map(ms => (
                          <Item key={ms.name} name={ms.name} desc={ms.desc} color="#7ea8c4" />
                        ))}
                      </Section>

                      {/* Gear */}
                      <Section title="⚙️ Equipamento" color="#e8c97e">
                        {b.gear.map(g => (
                          <Item key={g.name} name={g.name} desc={g.desc} color="#e8c97e" />
                        ))}
                      </Section>

                      {/* Attributes */}
                      <Section title="📊 Atributos Prioritários" color="#7ec4a8">
                        {b.attributes.map((a, i) => (
                          <div key={i} style={{
                            padding: "6px 10px", marginBottom: "6px",
                            background: "#0d0c0a", borderLeft: "2px solid #7ec4a8",
                            fontSize: "13px", color: "#8a9e8a", lineHeight: "1.5",
                          }}>{a}</div>
                        ))}
                      </Section>
                    </div>

                    {/* GVG Role */}
                    <div style={{
                      marginTop: "16px", padding: "12px 16px",
                      background: "#0d0c0a", border: `1px solid ${b.priorityColor}20`,
                      borderLeft: `3px solid ${b.priorityColor}`,
                    }}>
                      <div style={{ fontSize: "11px", letterSpacing: "3px", color: b.priorityColor, marginBottom: "6px", textTransform: "uppercase" }}>
                        Função no GVG
                      </div>
                      <div style={{ fontSize: "13px", color: "#8a7a58", lineHeight: "1.6" }}>{b.gvgRole}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === "groups" && (
          <div>
            {/* Formation diagram */}
            <div style={{
              background: "#0f0e0b", border: "1px solid #2a2010", padding: "20px",
              marginBottom: "24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#5a4e30", marginBottom: "16px", textTransform: "uppercase" }}>
                Formação no Mapa
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
                {["🗡️B", "⚔️A", "🗡️C"].map((g, i) => (
                  <div key={i} style={{
                    padding: "8px 16px", background: "#1a1208",
                    border: "1px solid #3a2e1a", fontSize: "13px", color: "#d4c4a0",
                    letterSpacing: "1px",
                  }}>{g}</div>
                ))}
              </div>
              <div style={{ color: "#3a2e1a", margin: "8px 0", fontSize: "20px" }}>↑ ↑ ↑ Avanço</div>
              <div style={{ fontSize: "12px", color: "#5a4e30" }}>B = Side Esq. · A = Mid (Force Principal) · C = Side Dir.</div>
              <div style={{ fontSize: "12px", color: "#5a4e30", marginTop: "4px" }}>🏆E = Duelist em stand-by · 🌀D = Suporte dentro de A</div>
            </div>

            {groups.map((g) => (
              <div key={g.name} style={{
                border: `1px solid #2a2010`, borderLeft: `3px solid ${g.color}`,
                marginBottom: "16px", background: "#0f0e0b", borderRadius: "2px", overflow: "hidden",
              }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1208", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontSize: "16px", color: "#d4c4a0", fontWeight: "bold" }}>{g.name}</div>
                  </div>
                  <span style={{
                    background: g.color + "20", border: `1px solid ${g.color}`,
                    color: g.color, padding: "4px 12px", fontSize: "13px",
                  }}>{g.players} jogadores</span>
                </div>

                <div style={{ padding: "16px 20px" }}>
                  {g.composition.map(c => (
                    <div key={c.role} style={{
                      display: "flex", alignItems: "flex-start", gap: "12px",
                      marginBottom: "10px", padding: "10px 12px", background: "#0d0c0a",
                    }}>
                      <span style={{
                        background: g.color + "30", border: `1px solid ${g.color}50`,
                        color: g.color, padding: "2px 10px", fontSize: "12px",
                        flexShrink: 0, marginTop: "2px",
                      }}>×{c.count}</span>
                      <div>
                        <div style={{ color: "#c4b080", fontSize: "14px" }}>{c.role}</div>
                        <div style={{ color: "#5a4e30", fontSize: "12px", marginTop: "2px" }}>{c.desc}</div>
                      </div>
                    </div>
                  ))}

                  <div style={{
                    marginTop: "12px", padding: "12px 14px", background: "#0d0c0a",
                    borderLeft: `2px solid ${g.color}`,
                  }}>
                    <div style={{ fontSize: "11px", letterSpacing: "2px", color: g.color, marginBottom: "6px", textTransform: "uppercase" }}>
                      Estratégia
                    </div>
                    <div style={{ fontSize: "13px", color: "#7a6e50", lineHeight: "1.7" }}>{g.strategy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === "map" && <GVGMap />}

        {/* TIPS TAB */}
        {activeTab === "tips" && (
          <div>
            {[
              {
                title: "🔔 Lion's Roar — A Skill Mais Importante do GVG",
                color: "#e8c97e",
                tips: [
                  "Lion's Roar (O Sino) silencia inimigos em área — eles não podem usar skills nem escapar.",
                  "TODOS os builds devem ter Lion's Roar. Quando o Commander der o sinal, todo mundo usa ao mesmo tempo.",
                  "Um Lion's Roar coordenado de 10+ jogadores simultâneos = wipe instantâneo do time inimigo.",
                  "Combine com Nullify Healing dos Twinblades para que inimigos silenciados também não sejam curados.",
                ],
              },
              {
                title: "⏱️ Duelo dos 10 Minutos",
                color: "#e05050",
                tips: [
                  "Aos 10 minutos ocorre um duelo 1v1 obrigatório. Vencer é o ponto de virada da partida.",
                  "Vitória = Goose inimigo com -20% de defesa + torres perdem 60% do HP.",
                  "O Duelist (Nameless Sword) deve ser reservado — não entre em teamfight antes do duel.",
                  "Durante o duel, o resto do time mantém posição. Não avance sem o buff de vitória.",
                ],
              },
              {
                title: "💚 Preparação Antes de Entrar",
                color: "#7ec4a8",
                tips: [
                  "Todo jogador deve ir ao Banho em Kyong para o buff de Endurance (reduz custo de sprint/dodge).",
                  "Craftar e consumir 'Double Shreds' food para flat damage boost.",
                  "Usar scrolls de Movement Speed ou redução de dodge antes de entrar.",
                  "Verificar Inner Ways e Martial Points investidos — não é possível mudar dentro da batalha.",
                ],
              },
              {
                title: "🗺️ Controle de Lanes e Green Points",
                color: "#a8c4e0",
                tips: [
                  "Os side lanes têm mobs de IA. Farmar = Green Points para comprar buffs poderosos.",
                  "Buffs disponíveis: Movement Speed massivo, Healing Reduction nos inimigos, +100% dano em torres.",
                  "Assassinos devem sempre comprar o buff de anti-heal ANTES do grande clash do mid.",
                  "Se um side lane for dominado pelo inimigo, os dois grupos de assassinos podem convergir para defender.",
                ],
              },
              {
                title: "🚫 Erros Comuns",
                color: "#e05050",
                tips: [
                  "Avançar os healers além dos tanks — healers na linha de frente morrem primeiro e o time colapsa.",
                  "Usar Lion's Roar aleatoriamente em vez de esperar o sinal coordenado do Commander.",
                  "Mandar o Duelist para o teamfight antes do duel dos 10 minutos.",
                  "Ignorar os side lanes — Green Points são a diferença entre vencer e perder clashes decisivos.",
                  "Trocar de build na véspera do GVG — Inner Ways não transferem, levam semanas para reinvestir.",
                ],
              },
            ].map(section => (
              <div key={section.title} style={{
                border: "1px solid #2a2010", borderLeft: `3px solid ${section.color}`,
                marginBottom: "16px", background: "#0f0e0b", overflow: "hidden",
              }}>
                <div style={{ padding: "14px 20px", background: "#1a1208", borderBottom: "1px solid #2a2010" }}>
                  <div style={{ fontSize: "15px", color: "#d4c4a0" }}>{section.title}</div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  {section.tips.map((tip, i) => (
                    <div key={i} style={{
                      display: "flex", gap: "12px", marginBottom: "10px",
                      padding: "10px 12px", background: "#0d0c0a",
                    }}>
                      <span style={{ color: section.color, flexShrink: 0, marginTop: "2px" }}>◆</span>
                      <span style={{ fontSize: "13px", color: "#8a7a58", lineHeight: "1.7" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", borderTop: "1px solid #1a1208", color: "#3a2e1a", fontSize: "11px", letterSpacing: "2px" }}>
        WHERE WINDS MEET · GVG GUIDE · VERSÃO 1.0.12 / PATCH HEXI 2026
      </div>
    </div>
  );
}

// ─── MAP POINTS DATA ────────────────────────────────────────────────────────
const mapPoints = [
  // ── ALLY SIDE (bottom) ──
  {
    id: "ally-base", x: 50, y: 88, emoji: "🏯", label: "Sua Base",
    color: "#4a9eff", size: 22,
    title: "Base Aliada",
    timing: "Permanente",
    respawn: "—",
    info: "Ponto de respawn da sua guild. O tempo de respawn aumenta conforme a partida avança. Nos últimos minutos, mortes são extremamente custosas — evite overextend sem suporte.",
    action: "Respawn de aliados. Ponto de entrega da Fortune Tree para vitória instantânea.",
  },
  {
    id: "ally-tree", x: 50, y: 80, emoji: "🌳", label: "Árvore Aliada",
    color: "#4a9eff", size: 18,
    title: "Fortune Tree — Aliada",
    timing: "Permanente",
    respawn: "—",
    info: "A Fortune Tree aliada deve ser protegida. Inimigos tentarão carregá-la até a base deles. Quanto mais jogadores próximos, mais lento o carregamento.",
    action: "Defender: agrupe aliados ao redor. Use Inkwell Fan para criar Windwalls bloqueando o caminho do carrier.",
  },
  {
    id: "ally-tower-top", x: 18, y: 68, emoji: "🗼", label: "Torre Top",
    color: "#4a9eff", size: 16,
    title: "Torre — Lane Superior (Aliada)",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Torre da lane superior da sua equipe. Protege o caminho ao Goose aliado. Destruir torres inimigas dá pontos de vitória se o tempo acabar.",
    action: "Defender ou usar como ponto de reagrupamento. Buff de +100% dano em torres (comprado com Fun Coins) torna a destruição muito mais rápida.",
  },
  {
    id: "ally-tower-mid", x: 50, y: 68, emoji: "🗼", label: "Torre Mid",
    color: "#4a9eff", size: 16,
    title: "Torre — Lane Central (Aliada)",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Torre principal da lane do meio. A mais contestada do mapa — quem controla o mid controla o ritmo da partida.",
    action: "Ponto de defesa central. Tanks e healers devem operar aqui durante a fase inicial.",
  },
  {
    id: "ally-tower-bot", x: 82, y: 68, emoji: "🗼", label: "Torre Bot",
    color: "#4a9eff", size: 16,
    title: "Torre — Lane Inferior (Aliada)",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Torre da lane inferior. Geralmente menos contestada no início — assassinos inimigos podem tentar flanquear por aqui.",
    action: "Monitorar com o grupo de assassinos do Grupo C. Se cair, o Goose fica exposto pelo flanco.",
  },
  {
    id: "ally-goose", x: 50, y: 74, emoji: "🦢", label: "Ganso Aliado",
    color: "#4a9eff", size: 20,
    title: "Goose (Ganso) — Aliado",
    timing: "Permanente até ser morto",
    respawn: "Não respawna",
    info: "O Goose protege a Fortune Tree aliada. Inimigos precisam matá-lo antes de pegar a árvore. Se o duelo dos 10min for perdido, o Goose inimigo recebe -20% defesa e torres -60% HP.",
    action: "Defender a todo custo. Coordenar Lion's Roar quando inimigos tentarem focar o Goose.",
  },

  // ── ENEMY SIDE (top) ──
  {
    id: "enemy-base", x: 50, y: 12, emoji: "🏯", label: "Base Inimiga",
    color: "#ff5555", size: 22,
    title: "Base Inimiga",
    timing: "Permanente",
    respawn: "—",
    info: "Ponto de respawn inimigo. Levar a Fortune Tree inimiga até aqui = vitória instantânea. Protegida por torres e o Goose inimigo.",
    action: "Objetivo final. Após matar o Goose inimigo, escortar a árvore até aqui com buff Sprint + Relentless Advance.",
  },
  {
    id: "enemy-tree", x: 50, y: 20, emoji: "🌳", label: "Árvore Inimiga",
    color: "#ff5555", size: 18,
    title: "Fortune Tree — Inimiga",
    timing: "Disponível após matar o Goose inimigo",
    respawn: "—",
    info: "O objetivo principal de ataque. Após matar o Goose inimigo, um jogador carrega a árvore lentamente em direção à base aliada. O carrier fica muito lento — precisa de escolta.",
    action: "Carrier usa Sprint (buff do Commander) + Relentless Advance para sair da base inimiga rapidamente. Time inteiro escolta.",
  },
  {
    id: "enemy-tower-top", x: 18, y: 32, emoji: "🗼", label: "Torre Top",
    color: "#ff5555", size: 16,
    title: "Torre Inimiga — Lane Superior",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Torre inimiga da lane superior. Destruí-la abre caminho para o Goose pelo flanco. Se o duel dos 10min for ganho, perde 60% do HP automaticamente.",
    action: "Grupo B (Side Esquerdo) prioriza pressionar essa torre. Use buff +100% dano em torres quando disponível.",
  },
  {
    id: "enemy-tower-mid", x: 50, y: 32, emoji: "🗼", label: "Torre Mid",
    color: "#ff5555", size: 16,
    title: "Torre Inimiga — Lane Central",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Principal objetivo do Grupo A (Força Principal). Destruir essa torre abre o caminho direto ao Goose inimigo pelo mid.",
    action: "Push coordenado após vencer o duel dos 10min. Tanks na frente, DPS foca a torre, healers sustentam.",
  },
  {
    id: "enemy-tower-bot", x: 82, y: 32, emoji: "🗼", label: "Torre Bot",
    color: "#ff5555", size: 16,
    title: "Torre Inimiga — Lane Inferior",
    timing: "Permanente até ser destruída",
    respawn: "Não respawna",
    info: "Torre inimiga da lane inferior. Alvo do Grupo C (Side Direito). Pressionar os dois flancos força o inimigo a dividir a defesa.",
    action: "Grupo C pressiona aqui enquanto o Grupo A ocupa o mid. Forçar divisão da defesa inimiga.",
  },
  {
    id: "enemy-goose", x: 50, y: 26, emoji: "🦢", label: "Ganso Inimigo",
    color: "#ff5555", size: 20,
    title: "Goose (Ganso) — Inimigo",
    timing: "Disponível após destruir ao menos 1 torre inimiga",
    respawn: "Não respawna",
    info: "Boss principal inimigo. Destruir 1+ torre abre acesso a ele. Após morto, a Fortune Tree inimiga fica disponível para carregar. Se o duel for ganho: -20% defesa.",
    action: "Focar com Hair Pulling (Commander skill: +100% dano ao Goose por 10s). Usar EX skills da Nameless Sword durante a janela do buff.",
  },

  // ── JUNGLE / NEUTRAL MOBS ──
  {
    id: "jungle-left-1", x: 10, y: 42, emoji: "👾", label: "Mobs Jungle",
    color: "#7ec4a8", size: 15,
    title: "Mobs Neutros — Flanco Esquerdo (Norte)",
    timing: "A cada 5 minutos",
    respawn: "5 min · Respawna: 0:00 / 5:00 / 10:00 / 15:00 / 20:00 / 25:00",
    info: "Mobs de IA nas lanes laterais. Derrotá-los dropa Fun Coins — a moeda usada pelo Commander para comprar buffs decisivos como Frontline Zeal.",
    action: "Grupo B (3 assassinos) deve farmar aqui continuamente. Prioridade: comprar Frontline Zeal (stacking permanente de dano).",
  },
  {
    id: "jungle-left-2", x: 10, y: 58, emoji: "👾", label: "Mobs Jungle",
    color: "#7ec4a8", size: 15,
    title: "Mobs Neutros — Flanco Esquerdo (Sul)",
    timing: "A cada 5 minutos",
    respawn: "5 min · Respawna: 0:00 / 5:00 / 10:00 / 15:00 / 20:00 / 25:00",
    info: "Segundo camp de mobs do flanco esquerdo. Quanto mais camps farmados, mais Fun Coins acumuladas para o Commander gastar em buffs.",
    action: "Mesmo grupo de assassinos do Grupo B. Limpar todos os camps antes de flanquear o backline inimigo.",
  },
  {
    id: "jungle-right-1", x: 90, y: 42, emoji: "👾", label: "Mobs Jungle",
    color: "#7ec4a8", size: 15,
    title: "Mobs Neutros — Flanco Direito (Norte)",
    timing: "A cada 5 minutos",
    respawn: "5 min · Respawna: 0:00 / 5:00 / 10:00 / 15:00 / 20:00 / 25:00",
    info: "Mobs de IA do flanco direito. Responsabilidade do Grupo C (3 assassinos). Mesma função dos flancos esquerdos — farm de Fun Coins.",
    action: "Grupo C farmando aqui. Após comprar buffs, flanquear healers inimigos e retornar ao mid nos clashes grandes.",
  },
  {
    id: "jungle-right-2", x: 90, y: 58, emoji: "👾", label: "Mobs Jungle",
    color: "#7ec4a8", size: 15,
    title: "Mobs Neutros — Flanco Direito (Sul)",
    timing: "A cada 5 minutos",
    respawn: "5 min · Respawna: 0:00 / 5:00 / 10:00 / 15:00 / 20:00 / 25:00",
    info: "Segundo camp do flanco direito. Os dois grupos de assassinos (B e C) devem espelhar um ao outro para máxima eficiência de farm.",
    action: "Limpar, comprar buffs, flanquear. Repetir a cada spawn de 5 minutos.",
  },

  // ── SPECIAL EVENTS ──
  {
    id: "miniboss-1", x: 50, y: 50, emoji: "💀", label: "Mini-Boss",
    color: "#e8c97e", size: 18,
    title: "Mini-Boss — Mid Lane",
    timing: "Minuto 15 e Minuto 25",
    respawn: "Aparece 2x por partida: 15:00 e 25:00 · Posição vertical aleatória no mid",
    info: "Um mini-boss poderoso spawna no mid lane em posição vertical aleatória. Matar esse boss dá vantagem significativa — recompensas de buff ou pontos para o Commander.",
    action: "Focar o mini-boss com o DPS principal (Grupo A). Tanks absorvem o dano. Cuidado com emboscadas inimigas enquanto o boss está ativo.",
  },
  {
    id: "duel-zone", x: 50, y: 50, emoji: "⚔️", label: "Duelo 1v1",
    color: "#e05050", size: 17,
    title: "Zona do Duelo — Halftime (10 minutos)",
    timing: "Minuto 10 — uma única vez",
    respawn: "Evento único — ocorre apenas 1x por partida",
    info: "Ao atingir 10 minutos, o Halftime Performer (Duelista) é puxado para um duelo 1v1 obrigatório. O resto da guild assiste. Vencer = -20% defesa no Goose inimigo + torres inimigas perdem 60% do HP. O maior ponto de virada da partida.",
    action: "Enviar o melhor duelist (Nameless Sword). O time aguarda e mantém posição. Após o resultado, iniciar push massivo no mid.",
  },

  // ── PVP ZONES ──
  {
    id: "pvp-mid", x: 50, y: 50, emoji: "🔥", label: "Zona PvP Mid",
    color: "#c47e7e", size: 14,
    title: "Zona de PvP — Centro do Mapa",
    timing: "Contínuo — teamfights acontecem aqui a partida toda",
    respawn: "—",
    info: "O centro do mapa é onde os grandes teamfights de 30v30 acontecem. CC coordenado (Lion's Roar) e anti-heal (Nullify Healing) são decisivos aqui. Quem controla o mid, controla a partida.",
    action: "Formação: Tanks na frente → CC/Suporte → DPS → Healers na retaguarda. Coordenar Lion's Roar simultâneo para wipar grupos inimigos.",
  },
];

// ─── GVG MAP COMPONENT ───────────────────────────────────────────────────────
function GVGMap() {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const wrapRef = React.useRef(null);

  const handleMouseEnter = (pt, e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setHovered(pt);
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove = (e) => {
    if (!hovered || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Group unique points (some share coordinates conceptually but rendered once)
  const uniquePoints = mapPoints.filter(
    (pt, idx, arr) => arr.findIndex(p => p.id === pt.id) === idx
  );

  const legendItems = [
    { color: "#4a9eff", label: "Aliado" },
    { color: "#ff5555", label: "Inimigo" },
    { color: "#7ec4a8", label: "Jungle/Mobs" },
    { color: "#e8c97e", label: "Boss/Evento" },
    { color: "#e05050", label: "Duelo" },
    { color: "#c47e7e", label: "PvP Zone" },
  ];

  return (
    <div>
      {/* Legend */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "12px",
        padding: "14px 0 18px", justifyContent: "center",
      }}>
        {legendItems.map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
            <span style={{ fontSize: "12px", color: "#7a6540", letterSpacing: "1px" }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* SVG Map */}
      <div ref={wrapRef} style={{ position: "relative", userSelect: "none" }}>
        <svg
          viewBox="0 0 100 100"
          style={{ width: "100%", maxWidth: "680px", display: "block", margin: "0 auto" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <radialGradient id="grd" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#c8955a"/>
              <stop offset="55%" stopColor="#b07840"/>
              <stop offset="100%" stopColor="#8a5c2a"/>
            </radialGradient>
            <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff3322" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#ff3322" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="blueBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2255cc" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#2255cc" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* === GRASS EXTERIOR === */}
          <rect x="0" y="0" width="100" height="100" fill="#2a5014"/>
          {/* Grass texture patches */}
          {[[8,12],[85,8],[5,80],[90,75],[15,50],[82,52],[50,3],[50,95],[30,18],[70,18],[28,82],[72,82]].map(([gx,gy],i)=>(
            <ellipse key={i} cx={gx} cy={gy} rx="4" ry="2.5" fill="#336018" opacity="0.6" transform={`rotate(${i*30},${gx},${gy})`}/>
          ))}

          {/* === OUTER WALL SHADOW === */}
          <ellipse cx="50.6" cy="51.2" rx="46" ry="47" fill="#0a0806" opacity="0.7"/>

          {/* === STONE WALL (outer) === */}
          <ellipse cx="50" cy="50" rx="46" ry="47" fill="#5a6070"/>
          {/* Wall facing / lighter top edge */}
          <ellipse cx="50" cy="50" rx="46" ry="47" fill="none" stroke="#7a8090" strokeWidth="0.8"/>
          {/* Wall inner edge */}
          <ellipse cx="50" cy="50" rx="43.5" ry="44.5" fill="none" stroke="#484e5e" strokeWidth="0.5"/>

          {/* Wall stone texture lines */}
          {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map((deg,i)=>{
            const rad = deg*Math.PI/180;
            const x1 = 50 + 43*Math.cos(rad); const y1 = 50 + 44*Math.sin(rad);
            const x2 = 50 + 46*Math.cos(rad); const y2 = 50 + 47*Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a4050" strokeWidth="0.4" opacity="0.7"/>;
          })}

          {/* === SANDY INTERIOR GROUND === */}
          <ellipse cx="50" cy="50" rx="43.5" ry="44.5" fill="url(#grd)"/>

          {/* Ground variation patches */}
          <ellipse cx="32" cy="58" rx="14" ry="9" fill="#9a6830" opacity="0.25"/>
          <ellipse cx="68" cy="42" rx="12" ry="8" fill="#9a6830" opacity="0.2"/>
          <ellipse cx="50" cy="50" rx="8" ry="6" fill="#aa7038" opacity="0.15"/>
          <ellipse cx="22" cy="38" rx="7" ry="5" fill="#9a6830" opacity="0.18"/>
          <ellipse cx="78" cy="62" rx="7" ry="5" fill="#9a6830" opacity="0.18"/>

          {/* Lane paths – slightly lighter sandy strips */}
          <rect x="5" y="14" width="9" height="72" fill="#c8906a" opacity="0.18" rx="1"/>
          <rect x="45.5" y="8" width="9" height="84" fill="#c8906a" opacity="0.15" rx="1"/>
          <rect x="86" y="14" width="9" height="72" fill="#c8906a" opacity="0.18" rx="1"/>

          {/* Mid lane center line */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#b87840" strokeWidth="0.25" strokeDasharray="2,3" opacity="0.4"/>

          {/* === GATE TOP (ENEMY BASE) — large wooden pavilion === */}
          {/* Gate gap in wall */}
          <ellipse cx="50" cy="50" rx="43.5" ry="44.5" fill="#2a5014" clipPath="none"
            style={{display:"none"}}/>
          {/* Erase wall at top for gate opening */}
          <rect x="44" y="2" width="12" height="8" fill="#2a5014"/>
          {/* Gate roof */}
          <polygon points="40,6 50,1 60,6" fill="#3a3020" stroke="#2a2010" strokeWidth="0.3"/>
          <polygon points="41,6 50,1.8 59,6" fill="#4a4028"/>
          {/* Gate walls */}
          <rect x="41" y="5" width="5" height="6" fill="#3a3420" stroke="#2a2015" strokeWidth="0.2"/>
          <rect x="54" y="5" width="5" height="6" fill="#3a3420" stroke="#2a2015" strokeWidth="0.2"/>
          {/* Gate door opening */}
          <rect x="47" y="6" width="6" height="5" fill="#1a1008" rx="0.3"/>
          {/* Gate roof ridge */}
          <line x1="40" y1="6" x2="60" y2="6" stroke="#2a2010" strokeWidth="0.4"/>
          {/* Roof tiles */}
          {[41,43,45,47,49,51,53,55,57].map((rx,i)=>(
            <line key={i} x1={rx} y1="6" x2={rx+1} y2="2.5" stroke="#2a2010" strokeWidth="0.2" opacity="0.5"/>
          ))}
          {/* Enemy indicator */}
          <rect x="47.5" y="3" width="5" height="1.5" fill="#cc2222" opacity="0.8" rx="0.2"/>

          {/* === GATE BOTTOM (ALLY BASE) === */}
          <rect x="44" y="90" width="12" height="8" fill="#2a5014"/>
          <polygon points="40,94 50,99 60,94" fill="#3a3020" stroke="#2a2010" strokeWidth="0.3"/>
          <polygon points="41,94 50,98.2 59,94" fill="#4a4028"/>
          <rect x="41" y="89" width="5" height="6" fill="#3a3420" stroke="#2a2015" strokeWidth="0.2"/>
          <rect x="54" y="89" width="5" height="6" fill="#3a3420" stroke="#2a2015" strokeWidth="0.2"/>
          <rect x="47" y="89" width="6" height="5" fill="#1a1008" rx="0.3"/>
          <line x1="40" y1="94" x2="60" y2="94" stroke="#2a2010" strokeWidth="0.4"/>
          {[41,43,45,47,49,51,53,55,57].map((rx,i)=>(
            <line key={i} x1={rx} y1="94" x2={rx+1} y2="97.5" stroke="#2a2010" strokeWidth="0.2" opacity="0.5"/>
          ))}
          <rect x="47.5" y="95.5" width="5" height="1.5" fill="#2255cc" opacity="0.8" rx="0.2"/>

          {/* === BARRICADE CLUSTERS — helper inline === */}
          {/* Each cluster: group of 6-8 small rectangles (wooden fortifications) */}
          {/* Structure dims: rw=2.5, rh=1.8, gap=0.4, cluster=2r×3c = 8.7×4.0 */}
          {[
            // Left lane — 4 clusters running top to bottom
            {cx:6.5, cy:20}, {cx:6.5, cy:33}, {cx:6.5, cy:57}, {cx:6.5, cy:70},
            // Left mid-field — upper and lower
            {cx:26, cy:22}, {cx:26, cy:36}, {cx:26, cy:62}, {cx:26, cy:75},
            // Center upper & lower (flanking mid lane)
            {cx:39, cy:24}, {cx:39, cy:74},
            {cx:53, cy:24}, {cx:53, cy:74},
            // Right mid-field
            {cx:65, cy:22}, {cx:65, cy:36}, {cx:65, cy:62}, {cx:65, cy:75},
            // Right lane
            {cx:84, cy:20}, {cx:84, cy:33}, {cx:84, cy:57}, {cx:84, cy:70},
          ].map(({cx,cy},ci) => (
            <g key={ci}>
              {/* Shadow */}
              <rect x={cx+0.3} y={cy+4.3} width={9} height={0.7} fill="#0a0604" opacity="0.45" rx="0.2"/>
              {/* 2 rows × 3 cols of planks */}
              {[0,1].map(row=>[0,1,2].map(col=>(
                <rect key={`${row}-${col}`}
                  x={cx + col*3.0} y={cy + row*2.4}
                  width={2.5} height={1.8}
                  fill={row===0?"#3e2e14":"#362810"}
                  stroke="#1e1206" strokeWidth="0.25" rx="0.15"
                />
              )))}
              {/* Wood grain lines */}
              {[0,1,2].map(col=>(
                <line key={col} x1={cx+col*3+1.2} y1={cy} x2={cx+col*3+1.2} y2={cy+4.2}
                  stroke="#1e1206" strokeWidth="0.15" opacity="0.5"/>
              ))}
            </g>
          ))}

          {/* === CENTER SPARSE STRUCTURES === */}
          {/* A few isolated barricades in the mid zone */}
          {[[46,43],[50.5,43],[46,54],[50.5,54]].map(([bx,by],i)=>(
            <rect key={i} x={bx} y={by} width={2.5} height={1.8}
              fill="#362810" stroke="#1e1206" strokeWidth="0.25" rx="0.15"/>
          ))}

          {/* === TREES — Jungle Left (x~18-34, y~36-64) === */}
          {[
            [19,38],[22,44],[17,50],[20,56],[24,62],[28,40],[31,48],[27,56],[23,52],[30,34],[18,66]
          ].map(([tx,ty],i)=>(
            <g key={i}>
              <circle cx={tx} cy={ty} r={2.2} fill="#1e5010" opacity="0.9"/>
              <circle cx={tx} cy={ty} r={1.3} fill="#164010"/>
              <circle cx={tx-0.5} cy={ty-0.6} r={0.7} fill="#2a6818" opacity="0.7"/>
            </g>
          ))}

          {/* === TREES — Jungle Right (mirror) === */}
          {[
            [81,38],[78,44],[83,50],[80,56],[76,62],[72,40],[69,48],[73,56],[77,52],[70,34],[82,66]
          ].map(([tx,ty],i)=>(
            <g key={i}>
              <circle cx={tx} cy={ty} r={2.2} fill="#1e5010" opacity="0.9"/>
              <circle cx={tx} cy={ty} r={1.3} fill="#164010"/>
              <circle cx={tx+0.5} cy={ty-0.6} r={0.7} fill="#2a6818" opacity="0.7"/>
            </g>
          ))}

          {/* A few wall-side trees near the perimeter */}
          {[[8,28],[8,72],[92,28],[92,72],[26,12],[74,12],[26,88],[74,88]].map(([tx,ty],i)=>(
            <g key={i}>
              <circle cx={tx} cy={ty} r={1.6} fill="#1a4a0e" opacity="0.8"/>
              <circle cx={tx} cy={ty} r={0.85} fill="#123008"/>
            </g>
          ))}

          {/* === CENTER RED FLAG / OBJECTIVE MARKER === */}
          <circle cx="50" cy="50" r="5" fill="url(#redGlow)"/>
          <circle cx="50" cy="50" r="2.2" fill="#cc1a0a" stroke="#ff3322" strokeWidth="0.4"/>
          {/* Flag pole */}
          <line x1="50" y1="47" x2="50" y2="53" stroke="#8a6a30" strokeWidth="0.4"/>
          {/* Flag */}
          <polygon points="50,47.2 53.5,48.4 50,49.6" fill="#ee2222"/>

          {/* === DIVIDER LINE (center of map) === */}
          <line x1="6" y1="50" x2="94" y2="50" stroke="#8a6a30" strokeWidth="0.3" strokeDasharray="2,2.5" opacity="0.5"/>
          <text x="96" y="50.6" fill="#7a5a28" fontSize="1.6" textAnchor="start" opacity="0.7">·50·</text>

          {/* === ZONE LABELS === */}
          <text x="50" y="9" fill="#ff5555" fontSize="2.2" textAnchor="middle" opacity="0.8" fontWeight="bold">⚔ BASE INIMIGA</text>
          <text x="50" y="96" fill="#4a9eff" fontSize="2.2" textAnchor="middle" opacity="0.8" fontWeight="bold">🛡 NOSSA BASE</text>
          <text x="13" y="50.5" fill="#7ec4a8" fontSize="1.8" textAnchor="middle" opacity="0.6" transform="rotate(-90,13,50.5)">JUNGLE ▲</text>
          <text x="87" y="50.5" fill="#7ec4a8" fontSize="1.8" textAnchor="middle" opacity="0.6" transform="rotate(90,87,50.5)">JUNGLE ▲</text>

          {/* Ally base glow */}
          <ellipse cx="50" cy="92" rx="10" ry="4" fill="url(#blueBase)" opacity="0.6"/>

          {/* ── POINTS ── */}
          {uniquePoints.map((pt) => {
            const isHov = hovered?.id === pt.id;
            const r = pt.size / 10;
            return (
              <g key={pt.id}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => handleMouseEnter(pt, e)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow ring on hover */}
                {isHov && (
                  <circle cx={pt.x} cy={pt.y} r={r + 1.5}
                    fill="none" stroke={pt.color} strokeWidth="0.5" opacity="0.5" />
                )}
                {/* Pulse ring */}
                <circle cx={pt.x} cy={pt.y} r={r + 0.8}
                  fill="none" stroke={pt.color} strokeWidth="0.2" opacity={isHov ? 0.9 : 0.3} />
                {/* Main dot */}
                <circle cx={pt.x} cy={pt.y} r={r}
                  fill={pt.color + (isHov ? "40" : "20")}
                  stroke={pt.color}
                  strokeWidth={isHov ? "0.6" : "0.4"}
                />
                {/* Emoji */}
                <text x={pt.x} y={pt.y + r * 0.45}
                  fontSize={r * 1.2}
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                >{pt.emoji}</text>
                {/* Label */}
                <text x={pt.x} y={pt.y + r + 1.8}
                  fontSize="1.5" textAnchor="middle"
                  fill={isHov ? pt.color : "#5a4e30"}
                  style={{ pointerEvents: "none" }}
                >{pt.label}</text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (() => {
          const tipW = 280;
          const wrapW = wrapRef.current ? wrapRef.current.getBoundingClientRect().width : 600;
          const left = tooltip.x + tipW + 16 > wrapW ? tooltip.x - tipW - 12 : tooltip.x + 12;
          const top = Math.max(0, tooltip.y - 10);
          return (
            <div style={{
              position: "absolute", left, top,
              width: tipW, background: "#0f0e0b",
              border: `1px solid ${hovered.color}`,
              borderLeft: `3px solid ${hovered.color}`,
              padding: "12px 14px", pointerEvents: "none",
              zIndex: 99, boxShadow: `0 4px 24px ${hovered.color}30`,
            }}>
              <div style={{ fontSize: "13px", color: hovered.color, fontWeight: "bold", marginBottom: "8px" }}>
                {hovered.emoji} {hovered.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" }}>
                <div style={{ fontSize: "11px", color: "#7a6540" }}>
                  ⏱ <span style={{ color: "#c4b080" }}>{hovered.timing}</span>
                </div>
                {hovered.respawn !== "—" && (
                  <div style={{ fontSize: "11px", color: "#7a6540" }}>
                    🔄 <span style={{ color: "#9a8a60" }}>{hovered.respawn}</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: "12px", color: "#7a6e50", lineHeight: "1.6", marginBottom: "8px" }}>
                {hovered.info}
              </div>
              <div style={{ borderTop: `1px solid ${hovered.color}30`, paddingTop: "8px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: hovered.color, marginBottom: "4px", textTransform: "uppercase" }}>O que fazer</div>
                <div style={{ fontSize: "12px", color: "#8a7a58", lineHeight: "1.5" }}>{hovered.action}</div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Timing Timeline */}
      <div style={{ marginTop: "24px", background: "#0f0e0b", border: "1px solid #2a2010", padding: "16px 20px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#5a4e30", marginBottom: "16px", textTransform: "uppercase" }}>
          ⏱ Timeline da Partida
        </div>
        <div style={{ position: "relative", paddingTop: "8px" }}>
          {/* Line */}
          <div style={{ position: "absolute", top: "20px", left: 0, right: 0, height: "2px", background: "#2a2010" }} />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {[
              { time: "0:00", label: "Início", sub: "Mobs spawnam nos jungles", color: "#7ec4a8" },
              { time: "5:00", label: "Mobs", sub: "Respawn jungle (1ª vez)", color: "#7ec4a8" },
              { time: "10:00", label: "DUELO", sub: "Halftime 1v1 obrigatório", color: "#e05050" },
              { time: "15:00", label: "Mini-Boss", sub: "Spawna no mid (posição aleatória)", color: "#e8c97e" },
              { time: "20:00", label: "Mobs", sub: "Respawn jungle", color: "#7ec4a8" },
              { time: "25:00", label: "Mini-Boss", sub: "2º spawn no mid", color: "#e8c97e" },
              { time: "35:00", label: "FIM", sub: "Critérios de vitória por pontos", color: "#c47e7e" },
            ].map((ev) => (
              <div key={ev.time} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: ev.color, border: "2px solid #0f0e0b", zIndex: 1, marginBottom: "8px" }} />
                <div style={{ fontSize: "11px", color: ev.color, fontWeight: "bold", textAlign: "center" }}>{ev.time}</div>
                <div style={{ fontSize: "11px", color: "#c4b080", textAlign: "center", marginTop: "2px" }}>{ev.label}</div>
                <div style={{ fontSize: "10px", color: "#5a4e30", textAlign: "center", marginTop: "2px", maxWidth: "70px" }}>{ev.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commander Buffs */}
      <div style={{ marginTop: "16px", background: "#0f0e0b", border: "1px solid #2a2010", padding: "16px 20px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#5a4e30", marginBottom: "14px", textTransform: "uppercase" }}>
          🪙 Buffs do Commander (Fun Coins)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
          {[
            { name: "Frontline Zeal", priority: "🥇 PRIORITÁRIO", desc: "Stacking permanente de dano contra torres e Goose + velocidade de carregamento da árvore. Custo aumenta a cada uso. Comprar cedo e sempre.", color: "#e8c97e" },
            { name: "Hair Pulling", priority: "🥈 ALTO", desc: "+100% dano ao Goose por 10s. Usar quando o time inteiro tiver foco no Goose. Coordenar com EX skills da Nameless Sword.", color: "#a8c4e0" },
            { name: "Sprint", priority: "🥈 ALTO", desc: "+100% velocidade do carrier da Fortune Tree por 10s. Combinar com Relentless Advance para sair da base inimiga rapidamente.", color: "#a8c4e0" },
            { name: "Relentless Advance", priority: "🥉 MÉDIO", desc: "Árvore ignora interceptação por 5s. Combo com Sprint para o carrier escapar da base inimiga.", color: "#7ec4a8" },
            { name: "Last Stand", priority: "🥉 MÉDIO", desc: "-30% tempo de respawn do time por 1 minuto. Usar após wipes parciais para recuperar rapidamente.", color: "#7ec4a8" },
            { name: "Anti-Heal", priority: "⚡ SITUACIONAL", desc: "Reduz cura inimiga. Usar durante grandes teamfights quando o time inimigo tiver muitos healers ativos.", color: "#c47e7e" },
          ].map(b => (
            <div key={b.name} style={{ padding: "10px 12px", background: "#0d0c0a", borderLeft: `2px solid ${b.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", color: "#c4b080" }}>{b.name}</span>
                <span style={{ fontSize: "10px", color: b.color }}>{b.priority}</span>
              </div>
              <div style={{ fontSize: "12px", color: "#5a4e44", lineHeight: "1.5" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ background: "#0d0c0a", padding: "14px", border: "1px solid #1a1208" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", color, marginBottom: "12px", textTransform: "uppercase" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Item({ name, desc, color }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "13px", color, marginBottom: "2px" }}>◆ {name}</div>
      <div style={{ fontSize: "12px", color: "#5a4e44", lineHeight: "1.6", paddingLeft: "14px" }}>{desc}</div>
    </div>
  );
}
