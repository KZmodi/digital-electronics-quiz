const recall2025 = writtenFor(11);
const recallPage = (page, image) => ({
  pageLabel: `2025 回忆版 PDF 第 ${page} 页`,
  ...(image ? { image: `assets/recall-2025-${image}.png` } : {})
});
const recallDiagram = (name, alt) => `<img class="zoomable drawn" src="assets/recall-2025-${name}.svg" alt="${alt}">`;

questions.push(
  recall2025("s2", "二", 3, 1,
    `化简表达式 F = ${n("A")}${n("B")}C + AD + ${n("A")}BD + CDEFG + ABD。`,
    `最简与或式为 F = ${n("A")}${n("B")}C + AD + BD。`,
    `AD 已包含 ABD。将 AD 与 ${n("A")}BD 合并为 D(A+B)。当 A+B=1 时，CDEFG 被 D(A+B) 覆盖。当 A+B=0 时，CDEFG 被 ${n("A")}${n("B")}C 覆盖。因此 CDEFG 可以删去。`,
    recallPage(1)),
  recall2025("d3", "三", 5, 1,
    "根据逻辑图写出 Z 的表达式和真值表，并分析其逻辑功能。",
    `<p>Z = ${n("A ⊕ B ⊕ C")}，是三输入偶校验判别电路，输入中 1 的个数为偶数时输出 1。</p>
    ${table(["A", "B", "C", "Z"], [[0,0,0,1],[0,0,1,0],[0,1,0,0],[0,1,1,1],[1,0,0,0],[1,0,1,1],[1,1,0,1],[1,1,1,0]])}`,
    `图中 A 接 A₀，B 接 A₁。BA 为 00 或 11 时选 ${n("C")}，为 01 或 10 时选 C。故 Z = ${n("A ⊕ B")}${n("C")}+(A ⊕ B)C。`,
    recallPage(1, "mux")),
  recall2025("d4", "四", 5, 1,
    `用下列两种方法实现函数 F = BC + AC。<ol><li>仅用与非门。</li><li>使用 74LS138 和与非门。</li></ol>`,
    `<ol><li>用三个二输入与非门。F = ${n(n("BC") + "·" + n("AC"))}。</li><li>A、B、C 分别接 A₂、A₁、A₀，使能端 ST₁ 接 1，另外两端接 0。把低有效输出 ${y(3)}、${y(5)}、${y(7)} 接三输入与非门，门输出为 F。</li></ol>
    ${recallDiagram("nand-answer", "仅用与非门以及 74LS138 加与非门的两种接线")}`,
    "F=C(A+B)，在 ABC=011、101、111 时为 1。这三种情况下译码器的对应输出分别为 0，接与非门后得到 F。",
    { ...recallPage(1, "decoder"), note: "题干在 PDF 第 1 页，74LS138 配图在第 2 页。"}),
  recall2025("d5", "五", 7, 2,
    "根据图示逻辑电路写出驱动方程、状态方程，画出状态转移表或状态转移图，并分析电路能否自启动及其逻辑功能。",
    `<p><b>驱动方程</b><br>J₀ = Q₁ ⊕ ${n("Q₂")}，K₀ = 1<br>J₁ = Q₀${n("Q₂")}，K₁ = Q₂ ⊕ Q₀<br>J₂ = Q₀Q₁，K₂ = Q₀ ⊕ Q₁<br>${n("R<sub>d</sub>")} = ${n("Q₂(Q₀+Q₁)")}。</p>
    <p><b>状态方程</b>（异步清零端无效、有 CP 下降沿时）<br>Q₀⁺ = (Q₁ ⊕ ${n("Q₂")})${n("Q₀")}<br>Q₁⁺ = Q₀${n("Q₂")}${n("Q₁")} + ${n("Q₂ ⊕ Q₀")}Q₁<br>Q₂⁺ = Q₀Q₁${n("Q₂")} + ${n("Q₀ ⊕ Q₁")}Q₂。<br>异步清零有效时，Q₂Q₁Q₀ 立即清为 000。</p>
    ${table(["现态 Q₂Q₁Q₀", "下一稳定状态", "触发条件"], [["000","001","下降沿"],["001","010","下降沿"],["010","010","下降沿"],["011","100","下降沿"],["100","100","下降沿"],...["101","110","111"].map(state => [state,"000","异步清零"])])}`,
    "异步清零优先于 JK 的时钟动作。按理想逻辑分析，电路有 010 和 100 两个稳定状态，无循环计数功能。由任意初态会进入某个稳定状态，但不能自行进入同一个指定状态或统一循环。",
    recallPage(2, "jk")),
  recall2025("d6", "六", 7, 3,
    `用 74LS161 设计计数器。<ol><li>有效状态为 0～58、99（60 进制）。</li><li>使用异步级联。</li><li>给出进位输出 C<sub>O</sub>。</li></ol>`,
    `<p>用两片 74LS161 输出十位 T、个位 U，正常计数序列为 00→01→…→58→99→00。进位 C<sub>O</sub>=(T=9)·(U=9)，在 99 时有效。</p>
    ${recallDiagram("counter-answer", "74LS161 个位先更新，再由个位输出产生十位时钟的接线图")}`,
    `<ol><li>两片计数使能端接 1，低有效清零端共接外部复位，正常时为 1。个位用外部 CP，在 U=9 时让低有效 LD 为 0，下一上升沿同步装入 0000，否则正常加一。</li>
    <li>用两个下降沿 D 触发器分别锁存 S=(T=5 且 U=8) 和 W=(T=9 且 U=9)，复位时清零。十位的时钟 CP<sub>T</sub>=${n("U₃")}+SU₀，低有效置数端 LD<sub>T</sub>=${n("S+W")}，置数 D₃D₂D₁D₀ 接 S00S。</li>
    <li>普通逢九进一时，个位 U₃ 从 1 降到 0，产生十位上升沿。58 时 S 已锁存为 1，个位 8→9 使 U₀ 从 0 升到 1，十位便装入 1001，稳定后为 99。再过一个外部下降沿，S 清零、W 置位，十位时钟先回到低电平。下一外部上升沿使个位 9→0，从而又触发十位装入 0000。</li></ol>`,
    recallPage(3, "ls161")),
  recall2025("h7", "七", 12, 3,
    `用 HDL 语言设计数码管显示译码器。<ol><li>输入 A[3..0] 为 8421 BCD 码，带使能端 EN。</li><li>输出 D[6..0] 接共阳极数码管，另有标志位 VALID。</li></ol>`,
    pre(`module sevenseg2025(
    input [3:0] A,
    input EN,
    output reg [6:0] D,
    output VALID
);
    assign VALID = EN && (A <= 4'd9);

    always @* begin
        D = 7'b1111111;
        if (VALID) begin
            case (A)
                4'd0: D = 7'b0000001;
                4'd1: D = 7'b1001111;
                4'd2: D = 7'b0010010;
                4'd3: D = 7'b0000110;
                4'd4: D = 7'b1001100;
                4'd5: D = 7'b0100100;
                4'd6: D = 7'b0100000;
                4'd7: D = 7'b0001111;
                4'd8: D = 7'b0000000;
                4'd9: D = 7'b0000100;
                default: D = 7'b1111111;
            endcase
        end
    end
endmodule`),
    "Verilog 实现。题面未给出段位顺序、使能极性和 VALID 的具体语义。这里约定 D[6:0] 依次对应 a～g，EN 高有效，VALID 在使能且输入为 0～9 时为 1。共阳极数码管低电平点亮，禁用或非法输入时各段熄灭。",
    recallPage(3)),
  recall2025("h8", "八", 13, 4,
    `用 HDL 语言和模块化设计方法设计 99 进制可逆计数器。<ol><li>输入时钟为 1000 kHz，计数器只对秒信号计数。</li><li>限定使用 1000 分频的分频器。</li><li>EN=1 时加计数，EN=0 时减计数。</li><li>在顶层与上一题的显示译码器连接，并画出设计图。</li></ol>`,
    `<p>两个 1000 分频模块级联，产生每秒一次的计数使能。计数器范围为 00～98，接两片显示译码器。</p>
    ${recallDiagram("hdl-answer", "两级分频、模 99 可逆计数器和两位显示译码器框图")}
    ${pre(`module div1000_2025(
    input clk, rst, ce,
    output tick
);
    reg [9:0] phase;
    assign tick = ce && (phase == 10'd999);
    always @(posedge clk) begin
        if (rst)       phase <= 10'd0;
        else if (tick) phase <= 10'd0;
        else if (ce)   phase <= phase + 10'd1;
    end
endmodule

module mod99_2025(
    input clk, rst, tick, up,
    output reg [6:0] count
);
    always @(posedge clk) begin
        if (rst) count <= 7'd0;
        else if (tick) begin
            if (up) count <= (count == 7'd98) ? 7'd0 : count + 7'd1;
            else    count <= (count == 7'd0) ? 7'd98 : count - 7'd1;
        end
    end
endmodule

module recall2025_top(
    input Clock, rst, EN,
    output [6:0] tens_seg, ones_seg,
    output VALID
);
    wire tick_ms, tick_s;
    wire [6:0] count;
    wire [3:0] tens = count / 7'd10;
    wire [3:0] ones = count % 7'd10;
    wire tens_valid, ones_valid;

    div1000_2025 stage1(Clock, rst, 1'b1, tick_ms);
    div1000_2025 stage2(Clock, rst, tick_ms, tick_s);
    mod99_2025 counter(Clock, rst, tick_s, EN, count);
    sevenseg2025 show_tens(tens, 1'b1, tens_seg, tens_valid);
    sevenseg2025 show_ones(ones, 1'b1, ones_seg, ones_valid);
    assign VALID = tens_valid && ones_valid;
endmodule`)}`,
    "1000 kHz÷1000÷1000=1 Hz。两级分频和计数器共用 Clock，tick 信号作为时钟使能，每秒只更新一次。EN 只决定方向。加计数到 98 后回到 00，减计数到 00 后回到 98。实例化上一题的 sevenseg2025 模块即可综合整个设计。",
    recallPage(4))
);
