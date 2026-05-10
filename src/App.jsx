import { useState } from "react";

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
