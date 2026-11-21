# 数字电子技术刷题网页

当前共 48 题。第一套收录合集第 1–8 页 18 题，第二套共 7 页，收录合集第 9–15 页 30 题。

## 本地打开

- 直接用 Chrome 打开 `index.html` 可以练习。
- 在本目录运行 `python -m http.server 18765 --bind 127.0.0.1` 后，电脑打开 `http://127.0.0.1:18765/`。
- 安卓 USB 调试可用时执行 `adb -d reverse tcp:8765 tcp:18765`，手机 Chrome 仍打开 `http://127.0.0.1:8765/`。

错题按浏览器和访问地址保存。同一浏览器重开时请继续使用原地址。手机和电脑各自保存。

## 题库

题干、图示、答案与解析在 `bank.js`。追加试卷时为每题分配独立的固定 ID。网页按章、题型和录入次序计算展示编号，已有错题仍通过原 ID 关联。填空题与简答题查看答案后手动判定。

第一、二套的配图采用卷面转绘，题目内有相应原扫描图链接。第 10 页有一道 555 选择题的可辨认选项均与标准公式不符，暂只提供解析。第 14 页译码题原卷漏印输出有效电平，分别给出高、低有效的完整代码。卷面指定 AHDL 的程序用 AHDL，第 15 页的通用 HDL 题采用 Verilog。参考代码尚未在器件工具中编译。

器件资料可核对 [SN74LS139A](https://www.ti.com/lit/ds/symlink/sn74ls139a.pdf)、[SN74LS153](https://www.ti.com/lit/ds/symlink/sn74ls153.pdf)、[SN74LS290](https://www.ti.com/lit/ds/symlink/sn74ls293.pdf)、[Altera AHDL 手册](https://cdrdv2-public.intel.com/653698/81_gs.pdf)。
