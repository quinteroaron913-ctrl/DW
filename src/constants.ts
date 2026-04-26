/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Dimension {
  Bravery = 'Bravery',
  Intelligence = 'Intelligence',
  Empathy = 'Empathy',
  Independence = 'Independence',
  Loyalty = 'Loyalty',
}

export interface Option {
  text: string;
  scores: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: number;
  text: string;
  options: [Option, Option, Option, Option];
}

export interface Character {
  id: string;
  name: string;
  quote: string;
  analysis: string;
  baseStats: Record<Dimension, number>;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "当你面对一个未知的时空裂缝时，你的第一反应是？",
    options: [
      { text: "毫不犹豫地跳进去看看。", scores: { [Dimension.Bravery]: 3, [Dimension.Independence]: 1 } },
      { text: "拿出仪器测量它的能量读数。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "担心对面是否有人需要帮助。", scores: { [Dimension.Empathy]: 3 } },
      { text: "紧紧握住同伴的手，等待指令。", scores: { [Dimension.Loyalty]: 3 } },
    ],
  },
  {
    id: 2,
    text: "在陌生的星球，当地的外星生物看起来非常恐惧，你会？",
    options: [
      { text: "主动上前，用微笑平复他们的情绪。", scores: { [Dimension.Empathy]: 3 } },
      { text: "保持距离，观察他们的习性。 ", scores: { [Dimension.Intelligence]: 2, [Dimension.Independence]: 1 } },
      { text: "挺身而出，挡在同伴和生物之间。", scores: { [Dimension.Bravery]: 2, [Dimension.Loyalty]: 2 } },
      { text: "试图通过翻译器进行逻辑沟通。", scores: { [Dimension.Intelligence]: 3 } },
    ],
  },
  {
    id: 3,
    text: "如果博士给了你一个危险的操作指令，而你觉得还有更好的方法：",
    options: [
      { text: "大声指出这种做法的愚蠢，并提出自己的方案。", scores: { [Dimension.Independence]: 3, [Dimension.Intelligence]: 1 } },
      { text: "即使担心，依然选择相信并执行。", scores: { [Dimension.Loyalty]: 3 } },
      { text: "默默地在执行时加一点自己的改良。", scores: { [Dimension.Intelligence]: 2, [Dimension.Independence]: 2 } },
      { text: "询问他为什么要这么做，试图理解动机。", scores: { [Dimension.Empathy]: 2, [Dimension.Intelligence]: 1 } },
    ],
  },
  {
    id: 4,
    text: "你最希望拥有的旅行工具是？",
    options: [
      { text: "一个永远不会出错的超级电脑。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "一把能破开任何门锁的万能钥匙。", scores: { [Dimension.Independence]: 3 } },
      { text: "能瞬间传送到危难现场的传送器。", scores: { [Dimension.Bravery]: 3 } },
      { text: "能够跨越语种感受一切痛苦的共情仪。", scores: { [Dimension.Empathy]: 3 } },
    ],
  },
  {
    id: 5,
    text: "被困在密室里，逃生出口只有一个小孔，你会：",
    options: [
      { text: "不眠不休地计算墙壁的材料结构。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "用力撞门，尝试用暴力解决。", scores: { [Dimension.Bravery]: 3 } },
      { text: "安抚焦虑的其他同件，保持士气。", scores: { [Dimension.Empathy]: 3, [Dimension.Loyalty]: 1 } },
      { text: "自己寻找是否有隐秘的备用方案。", scores: { [Dimension.Independence]: 3 } },
    ],
  },
  {
    id: 6,
    text: "你觉得旅行的意义在于？",
    options: [
      { text: "见识宇宙中最壮丽的奇观。", scores: { [Dimension.Independence]: 2, [Dimension.Bravery]: 1 } },
      { text: "学习每一段历史背后的教训。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "在孤独的旅途中找到可以共度余生的人。", scores: { [Dimension.Empathy]: 2, [Dimension.Loyalty]: 2 } },
      { text: "成为保护弱小的一股力量。", scores: { [Dimension.Bravery]: 2, [Dimension.Loyalty]: 2 } },
    ],
  },
  {
    id: 7,
    text: "当你的家乡面临威胁，而你正身处宇宙另一头：",
    options: [
      { text: "立刻要求不惜一切代价赶回去。", scores: { [Dimension.Loyalty]: 3, [Dimension.Empathy]: 1 } },
      { text: "客观评估回去是否能真正解决问题。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "在心中默默祈祷，继续眼前的使命。", scores: { [Dimension.Independence]: 2 } },
      { text: "孤身一人借走飞行船强行冲破封锁。", scores: { [Dimension.Bravery]: 3, [Dimension.Independence]: 1 } },
    ],
  },
  {
    id: 8,
    text: "面对邪恶的戴立克（Dalek），你最可能的做法是？",
    options: [
      { text: "逻辑陷阱：让它在自我矛盾中崩溃。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "直接在它眼眼球传感器上开火。", scores: { [Dimension.Bravery]: 3 } },
      { text: "试图唤醒它可能残存的人性（即使概率极低）。", scores: { [Dimension.Empathy]: 3 } },
      { text: "坚定地站在博士身后支撑他的抗争。", scores: { [Dimension.Loyalty]: 3 } },
    ],
  },
  {
    id: 9,
    text: "在一场混乱的派对中，你通常是？",
    options: [
      { text: "在角落观察每个人并推理他们的关系。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "派对的灵魂，结交各种怪癖的朋友。", scores: { [Dimension.Empathy]: 2, [Dimension.Independence]: 2 } },
      { text: "照顾那个喝醉或落单的人。", scores: { [Dimension.Empathy]: 3, [Dimension.Loyalty]: 1 } },
      { text: "第一个提议玩冒险游戏的人。", scores: { [Dimension.Bravery]: 3 } },
    ],
  },
  {
    id: 10,
    text: "如果必须牺牲自己才能拯救整个星球，你会：",
    options: [
      { text: "微笑着道别，义无反顾。", scores: { [Dimension.Empathy]: 2, [Dimension.Bravery]: 2 } },
      { text: "这是最合理的选择，我可以接受。", scores: { [Dimension.Intelligence]: 2, [Dimension.Loyalty]: 2 } },
      { text: "我会努力寻找第三种方案，不到最后一秒不放弃。", scores: { [Dimension.Independence]: 3, [Dimension.Intelligence]: 1 } },
      { text: "我只为了我爱的人这么做，而不是为了抽象的星球。", scores: { [Dimension.Loyalty]: 3 } },
    ],
  },
  {
    id: 11,
    text: "你对规则的态度是？",
    options: [
      { text: "规矩就是用来打破的。", scores: { [Dimension.Independence]: 3, [Dimension.Bravery]: 1 } },
      { text: "如果能保护大多数人，我会遵守。", scores: { [Dimension.Loyalty]: 3 } },
      { text: "了解规则是为了更好地利用它们的漏洞。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "只要不违反我的道德底线，我无所谓。", scores: { [Dimension.Empathy]: 2, [Dimension.Independence]: 1 } },
    ],
  },
  {
    id: 12,
    text: "当你陷入绝望时，什么能让你支撑下去？",
    options: [
      { text: "我相信只要大脑在转，就有出路。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "我还没看够更远的世界，不能死在这里。", scores: { [Dimension.Bravery]: 1, [Dimension.Independence]: 2 } },
      { text: "因为还有人在家里等着我。", scores: { [Dimension.Loyalty]: 3 } },
      { text: "想起曾温暖过我的人或瞬间。", scores: { [Dimension.Empathy]: 3 } },
    ],
  },
  {
    id: 13,
    text: "你更偏好哪种智慧？",
    options: [
      { text: "能改造物理世界的硬科学。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "洞察人心、操控局面的情商。", scores: { [Dimension.Empathy]: 2, [Dimension.Independence]: 2 } },
      { text: "在绝境中求生的本能直觉。", scores: { [Dimension.Bravery]: 3 } },
      { text: "在各种文化间游刃有余的适应力。", scores: { [Dimension.Intelligence]: 1, [Dimension.Empathy]: 2 } },
    ],
  },
  {
    id: 14,
    text: "一个和你共事很久但并不合拍的人遇到了麻烦：",
    options: [
      { text: "尽管不合拍，我依然会尽职尽责地帮他。", scores: { [Dimension.Loyalty]: 3 } },
      { text: "分析帮他的风险与收益。 ", scores: { [Dimension.Intelligence]: 3 } },
      { text: "我会真心同情他的遭遇并安慰他。", scores: { [Dimension.Empathy]: 3 } },
      { text: "让他自己处理，那是他成长的机会。", scores: { [Dimension.Independence]: 3 } },
    ],
  },
  {
    id: 15,
    text: "你眼中的“领袖”：",
    options: [
      { text: "是那个最聪明、最不容易犯错的人。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "是能凝聚大家、让每个人感到被关怀的人。", scores: { [Dimension.Empathy]: 3 } },
      { text: "是危难时刻第一个冲在前面的人。", scores: { [Dimension.Bravery]: 3 } },
      { text: "我不需要领袖，我只想做我自己。", scores: { [Dimension.Independence]: 3 } },
    ],
  },
  {
    id: 16,
    text: "如果能给过去的自己一句话，你会说：",
    options: [
      { text: "“要更勇敢一点。”", scores: { [Dimension.Bravery]: 3 } },
      { text: "“不要那么固执地听别人的话。”", scores: { [Dimension.Independence]: 3 } },
      { text: "“多学一些有用的知识。”", scores: { [Dimension.Intelligence]: 3 } },
      { text: "“对身边的人好一点。”", scores: { [Dimension.Empathy]: 2, [Dimension.Loyalty]: 2 } },
    ],
  },
  {
    id: 17,
    text: "面对复杂的技术装置，你倾向于：",
    options: [
      { text: "先看说明书（或者博士的教程）。", scores: { [Dimension.Intelligence]: 2, [Dimension.Loyalty]: 1 } },
      { text: "直接凭直觉接通电源。", scores: { [Dimension.Bravery]: 2, [Dimension.Independence]: 2 } },
      { text: "分析线路中的优雅逻辑。 ", scores: { [Dimension.Intelligence]: 3 } },
      { text: "询问它的创造者为何设计这个。", scores: { [Dimension.Empathy]: 3 } },
    ],
  },
  {
    id: 18,
    text: "关于秘密：",
    options: [
      { text: "我会带进坟墓里。 ", scores: { [Dimension.Loyalty]: 3 } },
      { text: "秘密也是某种情报，可以在关键时刻使用。", scores: { [Dimension.Intelligence]: 2, [Dimension.Independence]: 2 } },
      { text: "守住它让我感到沉重，但我不会背叛同伴。", scores: { [Dimension.Empathy]: 2, [Dimension.Loyalty]: 2 } },
      { text: "我根本不在乎守不守秘密。", scores: { [Dimension.Independence]: 3 } },
    ],
  },
  {
    id: 19,
    text: "你最受不了哪种性格？",
    options: [
      { text: "自大却愚蠢的人。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "冷漠、没有情感的机器。", scores: { [Dimension.Empathy]: 3 } },
      { text: "背信弃义的小人。", scores: { [Dimension.Loyalty]: 3 } },
      { text: "不敢尝试、畏首畏尾的人。", scores: { [Dimension.Bravery]: 3 } },
    ],
  },
  {
    id: 20,
    text: "如果是最后一次旅行，你希望风景是：",
    options: [
      { text: "银河系的壮丽夕阳。", scores: { [Dimension.Independence]: 2, [Dimension.Bravery]: 1 } },
      { text: "一个宁静、没有战乱的小村庄。", scores: { [Dimension.Empathy]: 3 } },
      { text: "图书馆的深处，藏着无限的真理。", scores: { [Dimension.Intelligence]: 3 } },
      { text: "和最好的朋友围坐在篝火旁。", scores: { [Dimension.Loyalty]: 3, [Dimension.Empathy]: 1 } },
    ],
  },
];

export const CHARACTERS: Character[] = [
  {
    id: 'river_song',
    name: 'River Song',
    quote: 'Hello, Sweetie.',
    analysis: '你拥有极高维度的自由意志，不屑于线性的因果羁绊。你习惯在混乱中寻找优雅，在孤独中编织浪漫。那种直面死亡却能报以飞吻的狂气，是你灵魂最深处的底色。你既是解密者也是谜题本身，在守卫真相的同时，也守卫着那份跨越时间的深情。你不需要被定义，因为你本身就是时空长河中那道最不可预测、最迷人的脉冲。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 10, [Dimension.Empathy]: 7, [Dimension.Independence]: 10, [Dimension.Loyalty]: 8 },
  },
  {
    id: 'rose_tyler',
    name: 'Rose Tyler',
    quote: 'The Doctor showed me a better way of living your life. You don\'t just give up.',
    analysis: '你内心藏着足以改写星系法则的情感能量。你的忠诚不是被动守望，而是一种敢于撕裂时空、直面虚无的爆发力。你能在平凡的柴米油盐中孵化出改变宇宙的伟大，这种“恶狼”般的生命力让你在爱中无坚不摧。你总是能看到他人灵魂深处最细微的战栗并给予最坚定的拥抱。你是一个让不可能变成可能的梦梦，也是所有冒险中最温暖的归巢。',
    baseStats: { [Dimension.Bravery]: 8, [Dimension.Intelligence]: 6, [Dimension.Empathy]: 10, [Dimension.Independence]: 7, [Dimension.Loyalty]: 10 },
  },
  {
    id: 'martha_jones',
    name: 'Martha Jones',
    quote: 'I spent a lot of time with you thinking I was second best. But you know what? I am good.',
    analysis: '你拥有令人肃然起敬的理智与专业韧性。在危机面前，你是那个最先拿出手术刀进行逻辑切割的人。你懂得奉献，但更懂得自尊；你有极致的毅力步行救世，也有极致的优雅在受损时断然转身。你从不活在任何人的阴影之下，你的骄傲源于对自我的彻底掌控。你证明了：真正的勇敢，是当你明白自己不需要依靠神迹，也能成为神迹本身。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 9, [Dimension.Empathy]: 8, [Dimension.Independence]: 8, [Dimension.Loyalty]: 8 },
  },
  {
    id: 'donna_noble',
    name: 'Donna Noble',
    quote: 'I\'m not special. I\'m just a temp from Chiswick.',
    analysis: '你用最喧闹的外壳包裹着最温柔的正义。你从不盲从，甚至敢于在众神面前拍桌而起。这种植根于世俗烟火气的正直，让你具备了某种超越维度的共情平衡。你或许自谦平凡，但当你决定保护世界时，你的光芒足以让星际领主黯然失色。你不仅是同伴，更是航向的纠偏仪，时刻提醒着那些伟大的存在：每一个普通的灵魂都值得被神圣对待。',
    baseStats: { [Dimension.Bravery]: 8, [Dimension.Intelligence]: 8, [Dimension.Empathy]: 9, [Dimension.Independence]: 10, [Dimension.Loyalty]: 9 },
  },
  {
    id: 'amy_pond',
    name: 'Amy Pond',
    quote: 'Raggedy man, goodnight.',
    analysis: '你的生命是一场关于等待与渴望的长跑。那种在孤寂中守望奇迹的耐心，让你看起来既冷傲又炽热。你擅长用想象力去对抗崩坏的现实，甚至能通过记忆重塑时空的裂缝。你的个性中带着一丝少女式的固执与女王般的果敢，从不甘心被动接受命运的安排。你不是在寻找冒险，你就是冒险本身。在时间的尽头，你依然是那个敢于直视未来的无畏之人。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 7, [Dimension.Empathy]: 8, [Dimension.Independence]: 9, [Dimension.Loyalty]: 9 },
  },
  {
    id: 'rory_williams',
    name: 'Rory Williams',
    quote: 'I\'m the boy who waited. Two thousand years.',
    analysis: '你定义了这种宇宙级别的“可靠”。你的忠诚已经内化为一种对抗腐朽的恒常力量。在所有人都在追求宏大叙事时，你守着那份最朴素的理智与爱，在那段两千年的孤独寂静中，你完成了从平庸到伟大的蜕变。你的勇敢是内敛且无声的，像一座沉默的山峦。你不需要星际的赞颂，只要能成为某个人归来时的灯火，你便能战胜名为时间的所有敌人。',
    baseStats: { [Dimension.Bravery]: 10, [Dimension.Intelligence]: 8, [Dimension.Empathy]: 8, [Dimension.Independence]: 6, [Dimension.Loyalty]: 10 },
  },
  {
    id: 'clara_oswald',
    name: 'Clara Oswald',
    quote: 'Run you clever boy, and remember.',
    analysis: '你展现了某种近乎偏执的求知欲与控制力。为了找到那个唯一的解，你敢于把自己粉碎在历史的每一寸肌理中。你在智力博弈中展现出的冷酷与热忱，让你看起来像是一个误入尘世的时空领主。你天生就是掌控局面的棋手，总能在非对称的局势中通过自我博弈寻得生机。你的魅力在于那种极致的独立：即便世界遗忘了你，你依然在为世界奔跑。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 10, [Dimension.Empathy]: 7, [Dimension.Independence]: 9, [Dimension.Loyalty]: 8 },
  },
  {
    id: 'bill_potts',
    name: 'Bill Potts',
    quote: 'I don\'t want to be a hero. I just want to understand.',
    analysis: '你拥有最透彻的观察力与赤诚之心。你从不被宏大的伪装蒙蔽，总能问出那些剥离偏见、直指灵魂的本质问题。你在面对异化与孤独时的那份坦然，是建立在极度自信的基础之上的。即便身体被囚禁，你的共情力与理智依然能跨越种族的界限去寻找共鸣。你是一个真正的求真者，用温润如玉的人性，在冰冷的真理森林中点燃了最文明的篝火。',
    baseStats: { [Dimension.Bravery]: 8, [Dimension.Intelligence]: 9, [Dimension.Empathy]: 10, [Dimension.Independence]: 8, [Dimension.Loyalty]: 8 },
  },
  {
    id: 'yasmin_khan',
    name: 'Yasmin Khan',
    quote: 'I won\'t let you go. Not yet.',
    analysis: '你极具韧性，是那种在漫长星际荒原中永远不会倒下的旗帜。作为守护者，你有极其细腻的责任感与长跑运动员式的决心。你能在最动荡的文化撕裂中找到缝合的可能，用持久的温柔去抵御虚无。你的忠诚不是盲目服从，而是一种“我在这里，直到最后”的庄严承诺。你不是为了奇迹而出发，由于你的存在，平凡的旅程本身也演变成了一场奇迹。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 8, [Dimension.Empathy]: 8, [Dimension.Independence]: 7, [Dimension.Loyalty]: 10 },
  },
  {
    id: 'ryan_sinclair',
    name: 'Ryan Sinclair',
    quote: 'Life is what you make it.',
    analysis: '你用那份近乎笨拙的真诚，对抗着这个充满偏见的宇宙。你学会在犹豫中寻找支点，在摔倒后重新定义起跳的角度。你不需要什么华丽的天赋，那份敢于承认弱点并与之共处的坦率，就是你最强大的武器。你是一个务实的梦想家，明白真正的探险不在于星系，而在于自我的补完。你用善良和行动为周围的人筑起了一道名为信任的防线。',
    baseStats: { [Dimension.Bravery]: 8, [Dimension.Intelligence]: 7, [Dimension.Empathy]: 9, [Dimension.Independence]: 8, [Dimension.Loyalty]: 9 },
  },
  {
    id: 'graham_obrien',
    name: 'Graham O\'Brien',
    quote: 'I\'m just an old fella from Essex.',
    analysis: '你拥有那种看透一切却依然选择热爱的智慧。在经历了命运最残酷的掠夺后，你用一种英式冷幽默筑起了抵抗悲伤的战壕。你是团队中那抹最温润的暖色，总能在紧绷的局势中注入最宝贵的理智与体恤。你对友谊的赤诚是如此不可撼动，证明了无论身处何处，一颗博大的心脏才是跨越时空最通用的语言。你是所有冒险中，那个最让人感到安心的灵魂港湾。',
    baseStats: { [Dimension.Bravery]: 7, [Dimension.Intelligence]: 8, [Dimension.Empathy]: 10, [Dimension.Independence]: 7, [Dimension.Loyalty]: 10 },
  },
  {
    id: 'ruby_sunday',
    name: 'Ruby Sunday',
    quote: 'There\'s a mystery in everything.',
    analysis: '你是一个自带旋律感的探秘者，对世界保留着近乎孩童般的直觉。你不仅在旅行，你是在用每一次呼吸去同步宇宙的律动。你在逻辑断裂处能凭借共情之光强行走通，这种充满活力的冒险主义让他人不由自主地追随。你的生命之歌尚未完成，但在每一个跳跃的音符里，都写满了拒绝向平庸妥协的高傲。你就是那道划破寂静时空的金色闪电。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 8, [Dimension.Empathy]: 9, [Dimension.Independence]: 8, [Dimension.Loyalty]: 8 },
  },
  {
    id: 'belinda',
    name: 'Belinda',
    quote: 'It’s more than just duty. It’s who we are.',
    analysis: '你展现了某种极度的秩序感与克制下的神性。你的勇敢不是为了宣泄情绪，而是为了在彻底的崩坏中为文明锚定最后一分尊严。在乱世的烟尘里，你是一座冷静得近乎冷酷的哨塔，用绝不退缩的立场守护着那些微弱的规则与正义。你的理智是为了更好地承受牺牲，而你的忠诚则是你面对虚无深渊时，支撑你继续屹立不倒的最硬鳞片。',
    baseStats: { [Dimension.Bravery]: 9, [Dimension.Intelligence]: 9, [Dimension.Empathy]: 7, [Dimension.Independence]: 7, [Dimension.Loyalty]: 10 },
  },
];
