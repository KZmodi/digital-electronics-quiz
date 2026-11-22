const chapters = [
  "绪论", "数制与编码", "逻辑代数基础", "逻辑门电路", "组合逻辑电路",
  "集成触发器", "时序逻辑电路", "脉冲的产生与整形", "数模与模数转换",
  "存储器", "复杂可编程逻辑器件", "硬件描述语言及其应用", "数字系统设计"
];
const n = (s) => `<span class="overbar">${s}</span>`;
const table = (headers, rows) => `<table><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const choices = ["A", "B", "C", "D"];
const choiceFor = paper => (id, chapter, page, prompt, options, answer, explanation = "", extra = {}) =>
  ({ id: `p${paper}-c${id}`, paper, source: `一、${id}`, chapter, page, type: "选择题", prompt, options, answer, explanation, ...extra });
const writtenFor = paper => (id, source, chapter, page, prompt, answer, explanation, extra = {}) =>
  ({ id: `p${paper}-${id}`, paper, source, chapter, page, type: "简答题", prompt, answer, explanation, ...extra });
const choice = choiceFor(1);
const written = writtenFor(1);
const d = (i) => `D<sub>${i}</sub>`;
const y = (i) => n(`Y<sub>${i}</sub>`);
const source4 = "assets/p04.svg";
const source5 = "assets/p05.svg";
const source6 = "assets/p06.svg";
const source7 = "assets/p07.svg";
const originalScans = {
  4: "libfile_d98a6fc81fac8191a0d1249776c7021e",
  5: "libfile_499acbe393608191923cc5fc8cdb5e84",
  6: "libfile_d823006342c08191b24439bf7988fdeb",
  7: "libfile_ea26de6229c481919ac4b4828e6fc59d",
  9: "libfile_280ff5e56df48191877621f8009cf023",
  10: "libfile_00146a18d24081919d3ba34b1f721aaf",
  11: "libfile_0e4702359a9481918929c02bc500241c",
  12: "libfile_93932f2738c081919c4165bb0fd7a65c",
  13: "libfile_c6b9a32f7ae08191911e7e2ef49b0583",
  14: "libfile_c94b5b650f088191987e40612fe5a8f1",
  15: "libfile_519e53a2683481918b015c70a498100c",
  19: "libfile_7d71d65c22a48191bdfd62e55b67a8f1",
  20: "libfile_71a458ba2b648191b54009ee15ff558f",
  21: "libfile_12ff86020f80819190f7ed416c8cb491"
};
const series = ["000", "100", "010", "110", "001", "101", "011"];
const questions = [
  choice(1, 4, 1, "以下电路中可以实现线与功能的有（　）。",
    ["与非门", "三态输出门", "传输门", "OC 门"], "D", "多个 OC 门输出并联并接上拉电阻。任一路拉低，公共输出就为低。"),
  choice(2, 3, 1, `根据反演规则，F = (${n("A")} + C)·(C + DE) + ${n("E")} 的反函数为（　）。`,
    [`${n("F")} = (A${n("C")} + ${n("C")}(${n("D")} + ${n("E")}))·E`,
     `${n("F")} = A${n("C")} + ${n("C")}(${n("D")} + ${n("E")})·E`,
     `${n("F")} = (A${n("C")} + ${n("CD")} + ${n("E")})·E`,
     `${n("F")} = A${n("C")} + C(D + E)·${n("E")}`], "A",
    `先将最外层的或变成与，最后一项 ${n("E")} 取反成为 E。前一乘积取反后得到 A${n("C")} + ${n("C")}(${n("D")} + ${n("E")})，整体再乘 E。`),
  { ...choice(3, 5, 1, `用四选一数据选择器 74LS153 实现函数 Y = ${n("A")}B + AB，A、B 分别与 A<sub>1</sub>、A<sub>0</sub> 相接，应使（　）。`,
    [`${d(0)} = ${d(2)} = 0，${d(1)} = ${d(3)} = 1`,
     `${d(0)} = ${d(2)} = 1，${d(1)} = ${d(3)} = 0`,
     `${d(0)} = ${d(1)} = 0，${d(2)} = ${d(3)} = 1`,
     `${d(0)} = ${d(1)} = 1，${d(2)} = ${d(3)} = 0`], "A",
    `Y = (${n("A")} + A)B = B。选择码 AB 依次为 00、01、10、11 时，Y 依次为 0、1、0、1。`), endPage: 2 },
  choice(4, 3, 2, "根据最小项的定义，ABCD 逻辑相邻的最小项个数有（　）。",
    ["3 个", "4 个", "5 个", "6 个"], "B", "逻辑相邻的两个最小项恰有一位不同。A、B、C、D 中任选一位取反，共 4 种。"),
  choice(5, 7, 2, "下列电路中，属于时序逻辑电路的是（　）。",
    ["编码器", "译码器", "数值比较器", "计数器"], "D"),
  choice(6, 8, 2, "用 555 定时器构成单稳态触发器，其输出的脉宽为（　）。",
    ["0.7RC", "1.1RC", "1.4RC", "1.8RC"], "B", "电容电压由近似 0 充到 2/3 电源电压，所需时间为 RC·ln 3，约为 1.1RC。"),
  choice(7, 6, 2, "一个 T 触发器，在 T = 0 时，加上时钟脉冲，则触发器（　）。",
    ["保持原态", "置 0", "置 1", "翻转"], "A"),
  choice(8, 7, 2, "四个触发器构成的扭环形计数器，最多有（　）个有效状态。",
    ["4", "8", "10", "16"], "B", "标准 n 位扭环形计数器的有效循环有 2n 个状态。"),
  choice(9, 11, 2, "FPGA 是基于（　）的可编程逻辑器件。",
    ["查找表技术、SRAM 存储工艺", "查找表技术、EEPROM 存储工艺", "乘积项技术、SRAM 存储工艺", "乘积项技术、EEPROM 存储工艺"],
    "A", "按卷面选项和课程常见的 SRAM 型 FPGA 结构作答。"),
  choice(10, 12, 2, "AHDL 语言程序设计中，可在（　）中定义分频器功能描述。",
    ["设计段", "子设计段", "逻辑段", "变量段"], "C", "分频的计数、回零和输出逻辑写在 BEGIN 与 END 之间。"),
  written("s1", "二、1", 3, 2,
    `用代数法将下面的函数化为最简与或式（5 分）。<p class="formula">F = C(${n(`${n("A")}BD + BC + ABD`)} + (B + C)D)</p>`,
    `F = ${n("B")}C + CD`,
    `<ol><li>反号下的两项 ${n("A")}BD + ABD 合并成 BD，所以反号内为 B(D + C)。</li><li>由反演律，F = C(${n("B")} + ${n("D")}${n("C")} + BD + CD)。</li><li>C${n("C")} = 0，且 C(BD + CD) = CD，得到答案。</li></ol>`),
  written("s2", "二、2", 3, 3,
    `用卡诺图法将下列函数化简为最简与或式（5 分）。<p class="formula">F(A,B,C,D) = Σm(0,2,4,5,7,13) + Σd(8,9,10,11,14,15)</p>其中 Σd 为无关项。`,
    `F = ${n("B")}${n("D")} + BD + ${n("A")}B${n("C")}`,
    `${table(["AB╲CD", "00", "01", "11", "10"], [["00",1,0,0,1],["01",1,1,1,0],["11",0,1,"×","×"],["10","×","×","×","×"]])}
      <ul><li>四角成组 (0, 2, 8, 10)，得到 ${n("B")}${n("D")}。</li><li>中间四格成组 (5, 7, 13, 15)，得到 BD。</li><li>(4, 5) 成组得到 ${n("A")}B${n("C")}。也可用 (0, 4) 得到 ${n("A")}${n("C")}${n("D")}，结果同样最简。</li></ul>`),
  written("d1", "三", 5, 4,
    `请用以下的级联电路及最少量的逻辑门实现函数 Z = A${n("B")}C + ${n("A")}·${n(`${n("B")}C`)}D 的输出（12 分）。`,
    `按图只需一个外接与非门。<img class="zoomable drawn" src="assets/a04.svg?v=3" alt="两级低有效译码器和一个与非门的接线图">`,
    `<ol><li>令 T = ${n("B")}C。第一级低有效使能接 B，地址 A₁=A、A₀=C。取 ${y(3)} 得 ${n("AT")}，取 ${y(1)} 得 U=${n(`${n("A")}T`)}。</li><li>第二级低有效使能接 A，地址 A₁=U、A₀=D。取 ${y(3)} 得 ${n("UD")}（A=0 时），A=1 时该输出为 1。</li><li>两级的 3 路输出接与非门，得到 Z=AT+${n("A")}${n("T")}D。</li></ol>`,
    { image: source4 + "?v=3", note: "第 4 页公式第二项按双反号读取。配图和接线按实际 74LS139 的低有效使能修订。" }),
  written("d2", "四", 5, 5,
    `请用一片 4 选 1 数据选择器 74LS153 及最少量的逻辑门，用降维法实现逻辑函数 Z = ${n("A ⊕ B ⊕ C")} 的输出（要求数据选择器的 D<sub>0</sub>、D<sub>1</sub>、D<sub>2</sub>、D<sub>3</sub> 用变量 C 的某种形式表示）。（13 分）`,
    `取 A<sub>1</sub>=A，A<sub>0</sub>=B，${d(0)}=${d(3)}=${n("C")}，${d(1)}=${d(2)}=C。只需一个非门。<img class="zoomable drawn" src="assets/a05.svg" alt="74LS153 分配四路数据输入的接线图">`,
    `AB 为 00 或 11 时，A ⊕ B = 0，Z = ${n("C")}。AB 为 01 或 10 时，A ⊕ B = 1，Z = C。从同一路的正常输出 Y 取 Z，实际芯片该路的低有效选通端接 0。`,
    { image: source5 + "?v=3", note: "题图按实际 74LS153 修订，显示一路正常输出 Y。" }),
  written("d3", "五", 7, 6,
    "分析电路的逻辑功能，写出驱动方程、状态方程和输出方程，画出状态转换图，并检查能否自启动。图中三个 JK 触发器共用下降沿时钟，K₁ 接逻辑 1，最右侧与非门输出反馈至 J₁，后接的反相器输出为 Z。（12 分）",
    `<p>电路是同步七进制计数器，能自启动。状态位顺序为 Q<sub>1</sub>Q<sub>2</sub>Q<sub>3</sub>。</p>
    <p><b>驱动方程</b><br>J₁ = ${n("Q₂Q₃")}，K₁ = 1<br>J₂ = Q₁，K₂ = Q₁ + Q₃<br>J₃ = Q₁Q₂，K₃ = Q₂</p>
    <p><b>状态方程</b><br>Q₁⁺ = ${n("Q₁")}${n("Q₂Q₃")}<br>Q₂⁺ = Q₁${n("Q₂")} + ${n("Q₁")}${n("Q₃")}Q₂<br>Q₃⁺ = Q₁Q₂${n("Q₃")} + ${n("Q₂")}Q₃</p>
    <p><b>输出方程</b>　Z = Q₂Q₃。</p><img class="zoomable drawn" src="assets/a06.svg" alt="七个有效状态的循环以及非法状态 111 进入 000">`,
    `将每组 J、K 代入 Q⁺=J${n("Q")}+${n("K")}Q 后逐个检查状态。非法状态 111 在一个有效时钟沿后进入 000。循环内只有 011 输出 1。
    ${table(["现态", "次态", "Z"], [...series.map((state,i) => [state, series[(i+1)%series.length], state === "011" ? 1 : 0]), ["111","000",1]])}`,
    { image: source6 }),
  written("d4", "六", 7, 7,
    "采用 74LS290 和少量门电路设计 48 进制计数器。（8 分）",
    `两个 74LS290 分别构成个位和十位十进制计数器，出现 48 时一起异步清零。<img class="zoomable drawn" src="assets/a07.svg" alt="两个 74LS290 的 BCD 级联与 48 异步清零接线">`,
    `<ol><li>两片各自将 Q₀ 接 CP1，外部时钟接个位 CP0。个位 Q₃ 在 9→0 时由高变低，接入十位 CP0，使十位进一。</li><li>个位 Q₃ 和十位 Q₂ 分别接到两片的 R₀、R₁，S₀、S₁ 接 0。当计到 48 时，这两个清零条件第一次同时满足。每片内部已有双输入清零条件，可直接使用两个清零端。</li><li>稳定计数序列是 00 到 47，48 仅短暂出现并触发回 00。</li></ol>`,
    { image: source7 }),
  written("h1", "七、1", 12, 8,
    `要求程序实现两组 16 位二进制全减器功能，具体设计要求（5 分）。<ol><li>利用数组概念定义减数、被减数和全减差。文件名用 Qianqi 表示。</li><li>定义一个使能输入端 EN，确保实现全减器，输入使能端 EN 高电平有效。</li><li>定义一个全减器借位输出端 Co，来自低位的借位输入端 Ci。</li></ol>`,
    `AHDL 参考代码（Qianqi.tdf）<pre><code>SUBDESIGN Qianqi
(
    A[15..0], B[15..0] : INPUT;
    EN, Ci             : INPUT;
    Diff[15..0]        : OUTPUT;
    Co                 : OUTPUT;
)
VARIABLE
    Aext[16..0], Bext[16..0] : NODE;
    Borrow[16..0], Result[16..0] : NODE;
BEGIN
    Aext[16] = GND;
    Bext[16] = GND;
    Aext[15..0] = A[];
    Bext[15..0] = B[];
    Borrow[16..1] = 0;
    Borrow[0] = Ci;
    Result[] = Aext[] - Bext[] - Borrow[];

    IF EN THEN
        Diff[] = Result[15..0];
        Co = Result[16];
    ELSE
        Diff[] = 0;
        Co = GND;
    END IF;
END;</code></pre>`,
    "A 为被减数，B 为减数。用 17 位运算计算 A−B−Ci。低 16 位为差。无符号计算的数学差若为负，17 位结果的最高位为 1，表示向高位借位。",
    { note: "参照卷内 AHDL 题，编程题用 AHDL。题目未给 EN=0 时的输出要求，本答案约定清零。代码待 Quartus 编译核对。" }),
  written("h2", "七、2", 12, 8,
    `要求程序实现分频器功能，具体设计要求（5 分）。<ol><li>输入端 Inclk 为方波信号，输出端 Mc 为占空比为 1% 的脉冲信号。</li><li>输出端 Mc 的频率是输入端 Inclk 频率的千分之一。</li><li>定义一个使能输入端 EN，确保实现分频器，输入使能端 EN 高电平有效。</li></ol>`,
    `AHDL 参考代码（Divider1000.tdf）<pre><code>SUBDESIGN Divider1000
(
    Inclk, EN : INPUT;
    Mc        : OUTPUT;
)
VARIABLE
    Count[9..0] : DFF;
BEGIN
    Count[].clk = Inclk;

    IF EN THEN
        IF Count[].q == 999 THEN
            Count[].d = 0;
        ELSE
            Count[].d = Count[].q + 1;
        END IF;
        Mc = (Count[].q &lt; 10);
    ELSE
        Count[].d = 0;
        Mc = GND;
    END IF;
END;</code></pre>`,
    "EN 持续为高时，计数器每 1000 拍循环一次。0 到 9 共 10 拍为高，其余 990 拍为低，频率为输入的 1/1000，占空比为 10/1000。",
    { note: "本答案约定 EN=0 时输出立即拉低，计数器在下个上升沿清零。代码待 Quartus 编译核对。" })
];

const c2 = choiceFor(2);
const w2 = writtenFor(2);
const f2 = (id, chapter, page, prompt, answers, explanation) => w2(
  `f${id}`, `二、${id}`, chapter, page, prompt,
  answers.length === 1 ? answers[0] : `<ol>${answers.map(answer => `<li>${answer}</li>`).join("")}</ol>`,
  explanation, { type: "填空题" }
);

const fig = (file, alt, version = "") => `<img class="zoomable drawn" src="assets/${file}.svg${version}" alt="${alt}">`;
const pre = code => `<pre><code>${code.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</code></pre>`;
questions.push(
  c2(1, 2, 9, "在 BCD 码编码中，采用 2421 码编码方式，则 9 的 2421 码为（　）。",
    ["1111", "1001", "1101", "1011"], "A", "四位全为 1 时，位权之和为 2+4+2+1=9。"),
  c2(2, 3, 9, "N 个变量组成的最小项个数有（　）。",
    ["n²", "2<sup>n</sup>", "n+1", "n"], "B", "每个变量在最小项中可取原变量或反变量，n 个变量共有 2ⁿ 种组合。"),
  c2(3, 4, 9, "下列电路符号中是集电极开路门符号的是（　）。",
    ["图 A", "图 B", "图 C", "图 D"], "A", "图 A 的输出区带开路输出标记。",
    { image: "assets/p09-gates.svg" }),
  c2(4, 5, 9, "下列对组合电路的竞争和险象的说法是错误的是（　）。",
    ["信号经不同路径到达某一点时，所用的时间不同，这个时间差称之为竞争。",
      "由于竞争使得电路产生了暂时错误输出称之为险象。",
      "竞争和险象是对函数的，而不是针对电路的。",
      "一般来说，时延对数字系统是有害的，会产生竞争冒险现象。"],
    "C", "同一个逻辑函数可以有不同的电路实现。是否出现毛刺，与具体接法和各路径的传播时延有关。"),
  c2(5, 6, 9, "同步 RS 触发器的触发方式是（　）。",
    ["电平触发", "脉冲触发", "边沿触发", "时控触发"], "A",
    "课内的门控同步 RS 触发器在使能电平有效时响应 R、S。", { endPage: 10 }),
  c2(6, 7, 10, "由 n 个 D 触发器构成的扭环形计数器，其有效循环的状态数有（　）。",
    ["n²", "2n", "n", "n²−2n"], "B"),
  c2(7, 7, 10, "采用计数容量小于集成芯片容量的任意进制计数器，同步复位法采取（　）。",
    ["写 N−1 =（　）₂，全部 Q 为 1 的端与非 → Cr", "写 N =（　）₂，全部 Q 为 1 的端与非 → Cr",
      "写 N−1 =（　）₂，全部 Q 为 0 的端与非 → Cr", "写 N =（　）₂，全部 Q 为 0 的端与非 → Cr"],
    "A", "按题目的低有效同步清零接法，检测 N−1 后，下一个有效时钟沿清零，因此保留 0 到 N−1 共 N 个状态。"),
  c2(8, 8, 10, "采用标准无二极管接法，用 555 定时器构成的多谐振荡器，其周期 T 为（　）。",
    ["0.7TC", "1.1RC", "0.7(R+R₀)", "0.693(R₁+2R₂)C"], "D",
    "电容经 R₁、R₂ 充电，经 R₂ 放电。两段时间相加，得到 T≈0.693(R₁+2R₂)C。",
    { note: "D 已按标准电路公式纠正卷面印刷错误。", scans: [10] }),
  c2(9, 9, 10, "N 位倒 T 型电阻网络 DAC，若转换电压输出表达式 V₀ = V<sub>R</sub>·N<sub>B</sub>/2ᴺ，则反馈电阻 R<sub>f</sub> 与电阻网络 R 的关系为（　）。",
    ["R<sub>f</sub> = 0.5R", "R<sub>f</sub> = R", "R<sub>f</sub> = 2R", "R<sub>f</sub> = 3R"],
    "B", "比较标准倒 T 型网络的幅值系数 Rf/R 与题给的单位系数，得到 Rf=R。输出符号取决于参考电压和运放接法。"),
  c2(10, 11, 10, "阵列型 PLD 中，「与」可以编程而「或」是固定的是（　）。",
    ["PROM", "PLA", "GAL", "FPGA"], "C"),
  c2(11, 12, 10, "在 AHDL 语言设计中，定义状态机的段是（　）。",
    ["设计段", "子设计段", "变量段", "逻辑段"], "C",
    "状态机的机器类型和状态在 VARIABLE 中声明，状态转移逻辑写在逻辑段。"),
  c2(12, 12, 10, "AHDL 的布尔表达式中，表达式 (a, b, c)&amp;VCC 的结果为（　）。",
    ["(a, b, c)", "(a, 0, 0)", "(0, 0, c)", "(0, b, 0)"], "A", "VCC 为逻辑 1。逐位与 1 运算，每位保留原值。"),
  f2(1, 2, 10, "计算机进行补码加法运算的规则是：符号位参与运算，有进位时（　　）。",
    ["舍去从符号位向更高位产生的进位"], "位宽以内的进位正常传递。符号位外的进位不保留，有符号溢出需另行判断。"),
  f2(2, 4, 10, "同一个逻辑门电路，在不同逻辑定义下，实现的逻辑功能（　　）。",
    ["可能不同"], "同一个正逻辑与门，改用负逻辑解释后对应或逻辑。"),
  f2(3, 5, 10, "采用卡诺图来判断是否存在险象的方法是（　　），若存在则可能产生险象。",
    ["检查是否存在逻辑相邻且没有被同一圈覆盖的两个 1 格（与或式）"],
    "相邻格只改变一个变量。两格分属不同乘积项时，传播延时可能导致静态 1 冒险。或与式可对应检查相邻的 0 格。"),
  f2(4, 3, 10, "任何组合逻辑函数都可以表示为最小项的（　　）或最大项的（　　）。",
    ["和（逻辑或）", "积（逻辑与）"],
    "将函数值为 1 的各行对应的最小项用「或」连起来。将函数值为 0 的各行对应的最大项用「与」连起来。"),
  f2(5, 6, 10, "D 触发器转换为 JK 触发器的转换方程是（D =　　）。",
    [`D = J${n("Q")} + ${n("K")}Q`], "令 D 等于 JK 触发器的次态方程，Q 为当前状态。"),
  f2(6, 7, 10, "米里型时序电路输出信号的特点是（　　）。",
    ["输出取决于当前状态和当前输入"], "常写作 Y=f(Q,X)。"),
  f2(7, 9, 10, "双积分型 ADC 是指对输入电压 Vi 的（　　）积分和对参考电压 VR 的（　　）积分。",
    ["定时（固定时间）积分", "定值（反向积分至零，时间可变）积分"],
    "先把待测电压积分固定时长，再将反极性的参考电压接入积分器并计时，直到积分器输出回到零。"),
  f2(8, 11, 11, "CPLD 是基于（　　）技术、采用（　　）存储工艺的可编程逻辑器件。",
    ["乘积项", "EEPROM（课程常见表述为 E²PROM）"],
    "题目对应传统乘积项 CPLD。具体器件也存在采用其他非易失工艺的型号。"),
  f2(9, 12, 11, "在 EDA 技术领域中，通常把用 HDL 语言建立、功能经过验证、可以综合实现、电路集成总门数在 5000 门以上的 HDL 模型称之为（　　）。",
    ["IP 核（知识产权核）"], "按卷面和课程术语作答。题目中的门数是该题采用的口径。")
);

questions.push(
  w2("s1", "三", 3, 11,
    '请用卡诺图化简法将以下逻辑函数化为最简或与式。（6 分）<p class="formula">F = Σm(1,3,4,5,7,9,11,12,13,14,15)</p>',
    `F = (B + D)(A + ${n("C")} + D)`,
    `${table(["AB╲CD", "00", "01", "11", "10"], [["00",0,1,1,0],["01",1,1,1,0],["11",1,1,1,1],["10",0,1,1,0]])}
    <ul><li>求或与式时圈 0。四角 0、2、8、10 同圈，固定 B=0、D=0，得到 B+D。</li><li>把 2、6 同圈，固定 A=0、C=1、D=0，得到 A+${n("C")}+D。</li><li>两组对应的和项相乘。</li></ul>`),
  w2("d1", "四、1", 5, 11,
    "请分析以下双 2 线–4 线译码器 74LS139 的级联电路，并写出 L 的最简与或式。（10 分）",
    `L = ${n("A")}${n("B")} + ${n("A")}${n("C")} + ${n("B")}${n("C")} = Σm(0,1,2,4)`,
    `<ol><li>两片的使能和输出均为低有效，左片使能接 A，右片使能接 A 的反值，两片地址均为 BC。</li><li>A=0 时左片使能，左片 3 路仅在 BC=11 时拉低。A=1 时右片使能，右片 1、2、3 路在 BC≠00 时各有一路拉低。</li><li>所取的四路送入与门，故 L 在 3、5、6、7 处为 0。将 0、1、2、4 分别按 (0,1)、(0,2)、(0,4) 成组，得到答案。</li></ol>`,
    { image: "assets/p11-decode.svg?v=3", scans: [11, 12], endPage: 12 }),
  w2("d2", "四、2", 5, 12,
    `请用一片 4 选 1 数据选择器 74LS153 及最少量的逻辑门，用降维法实现以下逻辑函数（要求数据选择器地址输入端为 A、B）。（10 分）
    <p class="formula">Z(A,B,C) = ${n("AC")} + ${n("AB ⊕ C")}</p>`,
    `令 A₁=A、A₀=B，D₀=D₁=D₃=1、D₂=${n("C")}。该路低有效选通接 0，取正常输出 Y，只需一个反相器产生 ${n("C")}。${fig("a12-mux", "74LS153 正常输出接线图", "?v=3")}`,
    `${table(["AB","00","01","10","11"], [["Z","1","1",n("C"),"1"]])}
    按地址分组逐项代入 Z。只有 AB=10 时的输出随 C 变化，为 C 的反值。`,
    { image: "assets/p12-mux.svg?v=3", scans: [12] }),
  w2("d3", "五、1", 7, 12,
    "用集成计数器 74LS161 和八选一数据选择器构成的时序电路如图所示，试分析电路为多少进制计数分频电路（仅列出有效状态）及 Y 的输出序列信号是什么？（8 分）",
    `<p>模 6，有效状态为 10→11→12→13→14→15→10。以状态 10 为首，Y 循环输出 011010。</p>
    ${table(["N", "Q₃Q₂Q₁Q₀", "选中输入", "Y"], [[10,"1010","D₂",0],[11,"1011","D₃",1],[12,"1100","D₄",1],[13,"1101","D₅",0],[14,"1110","D₆",1],[15,"1111","D₇",0]])}`,
    "当 74LS161 计到 1111，CO=1。经反相使 LD 有效，下一个上升沿同步装入 1010。Q₂Q₁Q₀ 作多路选择器地址，按每个状态查相应接线。",
    { image: "assets/p12-divider.svg", scans: [12, 13], endPage: 13 }),
  w2("d4", "五、2", 7, 13,
    "以 74LS161 为核心，填加适当的门，设计一个模 6 计数器电路，要求有效计数状态序列为 Q₃Q₂Q₁Q₀=0，1，2，13，14，15 循环。（6 分）",
    `<p>ET=EP=1、清零端保持无效，D₃D₂D₁D₀ 接 1101。当 Q₃Q₂Q₁Q₀=0010 时让低有效 LD 为 0。先将 Q₃、Q₂、Q₀ 送入或非门，再将门输出与 Q₁ 送入与非门：</p><p>${n("LD")} = ${n(`${n("Q₃+Q₂+Q₀")}·Q₁`)}</p>${fig("a13-count", "检测二进制 0010 后装入 1101 的参考接线图")}`,
    "在 2 时检测并于下一上升沿装入 13。0、1、13、14 正常加一，15 在四位计数器内自然回到 0。需要从 0 开始时，先给异步清零端有效脉冲，再恢复无效。",
    { image: "assets/p13-ls161.svg" }),
  w2("d5", "六", 7, 13,
    `电路如图所示，其中 R<sub>A</sub>=R<sub>B</sub>=10 kΩ，C=0.1 μF。二极管按理想器件处理，充电时旁路 R<sub>B</sub>。三个 JK 触发器共用下降沿时钟。试分析：（14 分）
    <ol><li>在 U<sub>K</sub> 为高电平期间，有 555 定时器构成的是什么电路，其输出 U₀ 的频率 f₀=?（4 分）</li>
    <li>设 Q₂、Q₁、Q₀ 的初态为 000，分析由 JK 触发器 FF0、FF1、FF2 构成的电路，要求写出驱动方程和状态方程，画出完整的状态转换图。（8 分）</li>
    <li>设 Q₂、Q₁、Q₀ 的初态为 000，U<sub>K</sub> 所加正脉冲的宽度为 T<sub>W</sub>=6/f₀，假定计数器恰好收到 6 个有效下降沿，脉冲过后将保持在哪个状态？（2 分）</li></ol>`,
    `<ol><li>555 构成带二极管的多谐振荡器，按理想二极管近似，f₀≈721 Hz。</li>
    <li>驱动方程：J₂=Q₁Q₀，K₂=1；J₁=K₁=Q₀；J₀=${n("Q₂")}，K₀=1。<br>
    状态方程：Q₂⁺=Q₁Q₀${n("Q₂")}，Q₁⁺=Q₁⊕Q₀，Q₀⁺=${n("Q₂")}${n("Q₀")}。
    ${fig("a13-states", "含有效和无效状态的 8 状态转换图")}</li>
    <li>按题设的六个有效下降沿计数，最后保持 001。</li></ol>`,
    `<ol><li>二极管在充电时旁路 R<sub>B</sub>。近似 T=(R<sub>A</sub>+R<sub>B</sub>)C·ln2≈1.386 ms，取倒数得频率。</li>
    <li>由 JK 特性方程 Q⁺=J${n("Q")}+${n("K")}Q 得出状态方程。有效环为 000→001→010→011→100→000；其余状态 101→010、110→010、111→000。</li>
    <li>从 000 起，5 个有效下降沿回到 000，第 6 个到 001。</li></ol>`,
    { image: "assets/p13-555.svg" }),
  w2("h2", "七、2", 12, 14,
    `完成程序，实现分频功能（5 分）。输入为 inclk，输出为 fpf，输出频率是输入的十分之一。
    ${pre(`SUBDESIGN B
(
    inclk : INPUT;
    fpf   : OUTPUT;
)
VARIABLE
    __________;
    fp : DFF;
BEGIN
    __________;
    fp.clk = inclk;
    fpf = fp.q;
    IF __________ THEN
        a[] = 0;
        fp = !fp;
    __________
        a[] = a[] + 1;
        fp = fp;
    __________;
END;`)}`,
    `<p>按空的顺序：a[2..0] : DFF；a[].clk = inclk；a[].q == 4；ELSE；END IF。</p>
    ${pre(`SUBDESIGN B
(
    inclk : INPUT;
    fpf   : OUTPUT;
)
VARIABLE
    a[2..0] : DFF;
    fp      : DFF;
BEGIN
    a[].clk = inclk;
    fp.clk = inclk;
    IF a[].q == 4 THEN
        a[].d = 0;
        fp.d = !fp.q;
    ELSE
        a[].d = a[].q + 1;
        fp.d = fp.q;
    END IF;
    fpf = fp.q;
END;`)}`,
    "计数 0 至 4，每隔五个输入时钟翻转一次 fp。两次翻转构成一个输出周期，共十个输入周期。",
    { scans: [14], note: "代码待 Quartus 编译。" }),
  w2("h3", "八", 13, 15,
    `用模块化 HDL 语言设计一个由 INK 控制的模 60 可逆计数器。（12 分）
    <ol><li>INK=1 时加计数，INK=0 时减计数。</li><li>外部脉冲 clock 为 1000 Hz。</li><li>模 60 计数器只能对 1 Hz 信号进行计数。</li></ol>`,
    `<p>模块一每 1000 拍产生一个使能脉冲。模块二在每个使能脉冲处按 INK 加一或减一，59 加一回 0，0 减一回 59。以下是模块化 Verilog 参考代码。</p>
    ${pre(`module tick1000(input clk, input reset, output tick);
    reg [9:0] count;
    assign tick = (count == 10'd999);
    always @(posedge clk) begin
        if (reset || tick) count <= 10'd0;
        else count <= count + 10'd1;
    end
endmodule

module mod60(input clk, input reset, input tick,
             input up, output reg [5:0] q);
    always @(posedge clk) begin
        if (reset) q <= 6'd0;
        else if (tick) begin
            if (up) q <= (q == 6'd59) ? 6'd0 : q + 6'd1;
            else q <= (q == 6'd0) ? 6'd59 : q - 6'd1;
        end
    end
endmodule

module counter_top(input clock, input reset, input INK,
                   output [5:0] q);
    wire tick;
    tick1000 timer(clock, reset, tick);
    mod60 counter(clock, reset, tick, INK, q);
endmodule`)}`,
    "1000 Hz 下 1000 拍等于 1 秒。两个模块共用输入时钟，计数器只在频率为 1 Hz 的使能脉冲到来时更新，其他时刻保持。",
    { scans: [15], note: "第 15 页未指定 HDL 方言，参考实现选用 Verilog，并增加高有效同步复位将计数器初始化为 0。" })
);
const c3 = choiceFor(3);
const w3 = writtenFor(3);
const bitRow = (value, width) => value.toString(2).padStart(width, "0").split("");
const ls138Rows = [[0,"×","×","×","×",1,1,1,1,1,1,1,1],["×",1,"×","×","×",1,1,1,1,1,1,1,1],
  ...Array.from({length:8}, (_, i) => [1,0,...bitRow(i,3),...Array.from({length:8}, (_, j) => Number(i!==j))])];
const primeOnes = [2,3,5,7,11,13];
const primeTruth = Array.from({length:16}, (_, i) => [i,...bitRow(i,4),Number(primeOnes.includes(i))]);
const mod7Next = [1,2,3,4,5,6,0,0];
questions.push(
  c3(1, 2, 17, "下列对机器数反码的特点描述错误的是（　）。",
    ["正数的反码同原码，负数的反码数值按位取反", "只有 1 个 0", "反码的反码为原码", "符号位参与运算，有进位时循环相加"],
    "B", "以 4 位为例，+0 的反码为 0000，−0 的反码为 1111。负数由原码转成反码时只反转数值位。"),
  c3(2, 3, 17, `逻辑函数 F = A${n("B")} + ${n("A")}B + AB 的最简式是（　）。`,
    ["A+B", `${n("A")}+B`, `A+${n("B")}`, `${n("A")}+${n("B")}`], "A",
    `A${n("B")}+AB=A，再用吸收律 A+${n("A")}B=A+B。`),
  c3(3, 3, 17, "下列对逻辑函数表示方式不正确的描述是（　）。",
    ["逻辑表达式，真值表，卡诺图，波形图", "逻辑表达式，真值表，卡诺图，状态图",
      "逻辑表达式，真值表，卡诺图，逻辑图", "逻辑表达式，真值表，卡诺图，HDL 语言"], "B",
    "状态图主要用于描述时序电路的状态和转移。这里考的是普通逻辑函数的表示方式。"),
  c3(4, 3, 17, "对多变量逻辑异或运算的说法，下列正确的是（　）。",
    ["若有奇数个变量为 1，则结果为 1", "若有偶数个变量为 0，则结果为 1",
      "若有奇数个变量为 0，则结果为 0", "若有偶数个变量为 1，则结果为 1"], "A",
    "异或等价于对所有输入求和后模 2。结果由输入中 1 的个数的奇偶性确定。"),
  c3(5, 8, 17, "555 定时器构成的单稳态触发器，其输出一个正脉冲宽度 t<sub>w</sub> 由 RC 决定（　）。",
    ["t<sub>w</sub>=0.7RC", "t<sub>w</sub>=1.1RC", "t<sub>w</sub>=0.8RC", "t<sub>w</sub>=1.4RC"],
    "B", "电容从近似 0 充到 2/3 VCC 所需的时间为 RC·ln 3≈1.1RC。"),
  c3(6, 6, 17, "下列触发器属于脉冲触发方式的是（　）。",
    ["基本 RS 触发器", "钟控 RS 触发器", "边沿触发器", "主从触发器"], "D",
    "按课程分类，主从触发器利用时钟脉冲的两个阶段分别控制主级接收和从级更新。"),
  c3(7, 11, 18, "FPGA 是基于（　）存储工艺的可编程逻辑器件。",
    ["查找表技术、SRAM", "查找表技术、EEPROM", "乘积项技术、SRAM", "乘积项技术、EEPROM"],
    "A", "本题采用课程中的典型 SRAM 型 FPGA 模型，用查找表实现组合逻辑。"),
  c3(8, 12, 18, "AHDL 语言程序设计中，定义电路 I/O 端口的是（　）。",
    ["设计段", "子设计段", "逻辑段", "变量段"], "B", "输入端口和输出端口在 SUBDESIGN 的括号内声明。"),
  w3("s1", "二、1", 3, 18,
    `采用代数法化简逻辑函数最简式。<p class="formula">F = A${n("B")}CD + ABD + A${n("C")}D</p>`,
    "F = AD",
    `提取 AD 得 F=AD(${n("B")}C+B+${n("C")})。用 B+${n("B")}C=B+C，括号化为 B+C+${n("C")}=1。`),
  w3("s2", "二、2", 3, 18,
    `用卡诺图法化简逻辑函数最简式。<p class="formula">F = A${n("B")} + ${n("A")}C + BC + ${n("C")}D</p>`,
    `F = A${n("B")} + C + D`,
    `${table(["AB╲CD","00","01","11","10"], [["00",0,1,1,1],["01",0,1,1,1],["11",0,1,1,1],["10",1,1,1,1]])}
    <ul><li>列 11 与 10 的 8 个 1 成组，得到 C。</li><li>列 01 与 11 的 8 个 1 成组，得到 D。</li><li>行 AB=10 的 4 个 1 成组，得到 A${n("B")}。</li></ul>`),
  w3("d1", "三", 5, 19,
    `设计三类课程考试合格评判器。文化课程 A 及格得 2 分，专业理论课程 B 及格得 3 分，专业技能课程 C 及格得 5 分，各科不及格均得 0 分。总分大于 6 分则合格，输出为 Y。
    <ol><li>列出真值表。</li><li>写出逻辑函数表达式并化成最简式。</li><li>用 74LS138 与最少数量的二输入与非门画出逻辑电路。</li></ol>
    <details><summary>查看卷面 74LS138 功能表</summary><div class="table-scroll">${table(["S₁",`${n("S₂")}+${n("S₃")}`,"A₂","A₁","A₀",...Array.from({length:8},(_,i)=>y(i))],ls138Rows)}</div></details>`,
    `<p>A、B、C 各以 1 表示对应课程及格。</p>
    ${table(["A","B","C","总分","Y"],Array.from({length:8},(_,i)=>{const [a,b,c]=bitRow(i,3).map(Number), score=2*a+3*b+5*c; return [a,b,c,score,Number(score>6)];}))}
    <p>Y=Σm(3,5,7)=${n("A")}BC+A${n("B")}C+ABC=AC+BC=C(A+B)。</p>
    <p>用 74LS138 的一条低有效输出与两只二输入与非门即可实现。</p>${fig("a19-assessor","74LS138 合格评判器接线图")}`,
    `令 A₂=0、A₁=A、A₀=B，使能端 S₁=1、${n("S₂")}=${n("S₃")}=0。此时 ${y(0)} 等于 A+B。
    将 C 和 ${y(0)} 接入第一只与非门，得 ${n("C(A+B)")}。第二只与非门两输入并接，将结果反相得到 Y。`,
    { image: "assets/p19-ls138.svg" }),
  w3("d2", "四", 5, 20,
    `请完成四位二进制码中的质数判别器。输入变量从高位到低位为 A、B、C、D，输出为 Y。
    <ol><li>列出真值表。</li><li>利用卡诺图进行两次降维。</li><li>用四选一数据选择器 74LS153 及少量门电路画出逻辑电路。</li></ol>
    <details><summary>查看卷面 74LS153 功能表</summary>${table([n("E"),"D","A₁","A₀","Y"],[[1,"×","×","×",0],[0,"D₀",0,0,"D₀"],[0,"D₁",0,1,"D₁"],[0,"D₂",1,0,"D₂"],[0,"D₃",1,1,"D₃"]])}</details>`,
    `<p>0–15 的质数是 2、3、5、7、11、13，所以 Y=Σm(2,3,5,7,11,13)。</p>
    ${table(["序号","A","B","C","D","Y"],primeTruth)}
    <p>令 A₁=A、A₀=B、${n("E")}=0，数据端依次接 C、D、CD、${n("C")}D，取正常输出 Y。</p>
    ${fig("a20-prime","74LS153 四位质数判别器接线图")}`,
    `<p>四变量卡诺图</p>
    ${table(["AB╲CD","00","01","11","10"],[["00",0,0,1,1],["01",0,1,1,0],["11",0,1,0,0],["10",0,0,1,0]])}
    <p>第一次降维：对每一组 AB、C，将 D=0、D=1 的格合并成常量或 D 的函数。</p>
    ${table(["AB╲C","0","1"],[["00",0,1],["01","D","D"],["11","D",0],["10",0,"D"]])}
    <p>第二次降维：按 C 选择上一张表的两列，得到仅含 C、D 的子函数。</p>
    ${table(["A╲B",0,1],[[0,"C","D"],[1,"CD",`${n("C")}D`]])}
    <p>用一个反相器和两个与门生成 CD、${n("C")}D。</p>`,
    { image: "assets/p20-ls153.svg" }),
  w3("d3", "五", 7, 21,
    `用如图所示的集成计数器 74LS160 实现同步 65 进制计数器。
    <details><summary>查看卷面 74LS160 功能表</summary>${table(["CP",n("RD"),n("LD"),"E<sub>T</sub>","E<sub>P</sub>","Q"],[["×",0,1,"×","×",0],["↑",1,0,"×","×","置数"],["↑",1,1,1,1,"计数"]])}
    <p>CO=E<sub>T</sub>Q₃Q₀（合法 BCD 状态）。</p></details>`,
    `<p>两片 74LS160 分作十位和个位，共用 CP。个位 E<sub>T</sub>、E<sub>P</sub> 接 1；十位 E<sub>P</sub> 接 1、E<sub>T</sub> 接个位 CO。两片的 ${n("RD")} 接 1，D₃…D₀ 全接 0。</p>
    <p>检测十位为 0110 且个位为 0100（十进制 64），将两片 ${n("LD")} 同时拉低。计数循环为 00→01→…→64→00。</p>
    ${fig("a21-mod65","两片 74LS160 同步 65 进制计数器接线图")}`,
    `个位为 9 时 CO 有效，下一个共同上升沿个位回 0，十位加一。到 64 后，下一上升沿两片同时装入 0000。
    ${n("RD")} 是异步清零端，同步回 00 由低有效 ${n("LD")} 完成。启动时可先异步清零以建立 00 初态。`,
    { image: "assets/p21-ls160.svg" }),
  w3("d4", "六", 7, 22,
    `使用边沿 D 触发器设计一个同步 7 进制加计数器。
    <ol><li>完成状态表及写出驱动方程。</li><li>写出状态方程。</li>
    <li>分析电路的自启动能力。</li><li>画出逻辑电路图。</li></ol>`,
    `<p>使用三个共用 CP 的 D 触发器，规定 111 下一拍进入 000。</p>
    ${table(["现态 Q₂Q₁Q₀","次态 Q₂⁺Q₁⁺Q₀⁺","D₂D₁D₀"],mod7Next.map((v,i)=>[bitRow(i,3).join(""),bitRow(v,3).join(""),bitRow(v,3).join("")]))}
    <p>D₂=Q₂${n("Q₁")}+${n("Q₂")}Q₁Q₀<br>D₁=${n("Q₁")}Q₀+${n("Q₂")}Q₁${n("Q₀")}<br>D₀=${n("Q₀")}${n("Q₂Q₁")}</p>
    <p>状态方程 Qᵢ⁺=Dᵢ。唯一无效状态 111 经一次时钟进入 000，能自启动。</p>
    ${fig("a22-mod7","三个边沿 D 触发器的同步模 7 加计数器逻辑电路")}`,
    "写出 000 到 110 的递增循环，并补上 111→000。利用 D 触发器 Q⁺=D，逐列化简得到三个驱动方程。"),
  w3("h1", "七、1", 12, 23,
    `编写 3/8 译码器程序。输出 out[7..0] 高电平有效，输入 Decode[2..0] 为二进制代码，输入使能端 EN 高电平有效，文件名用 Decode 表示。`,
    pre(`// Decode.v
module decoder3to8 (
    input  wire [2:0] Decode,
    input  wire       EN,
    output wire [7:0] out
);
    assign out = EN ? (8'b00000001 << Decode) : 8'b00000000;
endmodule`),
    "EN 为 1 时，选中序号对应的输出位为 1，其余为 0。EN 为 0 时，八位全为 0。",
    { note: "参考代码使用 Verilog，文件名为 Decode.v。" }),
  w3("h2", "七、2", 12, 23,
    `编写程序实现方波输出。输入 inclk 为方波，输出 fb 的占空比为 50%，输出频率是输入频率的百分之一。`,
    pre(`module divider100 (
    input  wire inclk,
    input  wire reset,
    output reg  fb
);
    reg [5:0] phase;
    always @(posedge inclk) begin
        if (reset) begin
            phase <= 6'd0;
            fb <= 1'b0;
        end else if (phase == 6'd49) begin
            phase <= 6'd0;
            fb <= ~fb;
        end else begin
            phase <= phase + 6'd1;
        end
    end
endmodule`),
    "计数 0–49，每 50 个输入周期翻转一次。输出高电平和低电平各持续 50 拍，所以一个完整周期共 100 拍。",
    { note: "参考代码增加高有效同步复位，用来建立初态。" }),
  w3("h3", "八", 13, 24,
    `依据模块化、层次化设计方法，用 HDL 语言设计由 IN 控制的模 100 可逆计数器。
    <ol><li>IN=0 时加计数，IN=1 时减计数。</li><li>外部 Clock 为 2 kHz 方波。</li>
    <li>模 100 计数器只对频率 2 Hz、占空比 1% 的脉冲计数。</li><li>无需编写显示译码程序。</li></ol>`,
    `<p>分频模块产生 2 Hz、1% 占空比脉冲，同时产生一个与脉冲上升沿对应的更新使能。计数模块每个脉冲更新一次。</p>
    ${pre(`module pulse_divider (
    input wire clk, reset,
    output wire rise_enable,
    output reg  pulse2hz
);
    reg [9:0] phase;
    assign rise_enable = (phase == 10'd999);
    always @(posedge clk) begin
        if (reset) begin
            phase <= 10'd0;
            pulse2hz <= 1'b0;
        end else if (rise_enable) begin
            phase <= 10'd0;
            pulse2hz <= 1'b1;
        end else begin
            phase <= phase + 10'd1;
            if (phase == 10'd9)
                pulse2hz <= 1'b0;
        end
    end
endmodule

module mod100_counter (
    input wire clk, reset, enable, down,
    output reg [6:0] count
);
    always @(posedge clk) begin
        if (reset)
            count <= 7'd0;
        else if (enable) begin
            if (down)
                count <= (count == 7'd0) ? 7'd99 : count - 7'd1;
            else
                count <= (count == 7'd99) ? 7'd0 : count + 7'd1;
        end
    end
endmodule

module counter_top (
    input wire Clock, reset, IN,
    output wire pulse2hz,
    output wire [6:0] count
);
    wire rise_enable;
    pulse_divider div(Clock, reset, rise_enable, pulse2hz);
    mod100_counter cnt(Clock, reset, rise_enable, IN, count);
endmodule`)}`,
    "2 kHz 下 1000 拍为 0.5 s，得到 2 Hz。每周期高 10 拍，得到 1% 占空比。两模块共用 Clock，计数器只在分频脉冲上升的那一拍更新。99 加一回 0，0 减一回 99。",
    { note: "参考代码使用 Verilog。复位信号为高时同步初始化，计数输出为 0–99 的二进制值。" })
);
