import React, { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useImageLightbox } from "@site/src/components/ImageLightbox";
import "./home.css";
import productRelease from "@site/src/data/product-release.json";
import contentDates from "@site/src/data/content-dates.json";
const scenarios = {
    zh: [
      {
        id: "research",
        label: "研究与简报",
        icon: "research",
        headline: "材料很多，先把重点找出来。",
        prompt:
          "把这几份行业资料整理成一份简报。给出来源、主要分歧和待核实的问题，先给我草稿。",
        inputs: ["行业资料.pdf", "参考链接", "我的研究问题"],
        steps: [
          {
            title: "接收目标",
            detail: "从网页提交材料；重复性研究也可以配置定时或外部触发器。",
          },
          {
            title: "分工整理",
            detail:
              "主会话可以拆分检索与整理工作，让子会话各自处理，再传回资料引用。",
          },
          {
            title: "确认边界",
            detail:
              "把草稿保留在工作区。后续若要外发，按配置的审批策略请求确认。",
          },
          {
            title: "交付简报",
            detail: "生成可继续修改的文件，把结论、来源和待核实项一起留下。",
          },
        ],
        filename: "research-brief.demo.md",
        documentTitle: "行业研究简报",
        documentSubtitle: "示例结构 · 内容待真实材料验证",
        sections: [
          {
            heading: "01 / 主要观察",
            body: "把多份材料按同一问题归类，区分已知事实、不同观点和初步判断。",
          },
          {
            heading: "02 / 需要核实",
            body: "对口径不同的数据保留差异，列出需要补充的时间范围与原始出处。",
          },
          {
            heading: "03 / 下一步",
            body: "补齐关键证据后更新结论；保留来源清单，方便你继续追查。",
          },
        ],
        relatedLabel: "了解研究与文件处理",
        relatedHref: "/docs/manual/capabilities",
      },
      {
        id: "launch",
        label: "产品首发包",
        icon: "notes",
        headline: "一个首发包，两个子会话接力。",
        prompt:
          "根据三篇官方资料，准备可审阅的产品首发包。A 核对事实；B 制作离线页面与短文案；汇总后检查修订，不对外发布。",
        inputs: ["3 篇官方资料", "明确分工与交付要求"],
        steps: [
          {
            title: "读取资料并派工",
            detail:
              "汇总会话创建 A「事实核对」与 B「页面与文案」两个独立子会话，并分别提交任务。",
          },
          {
            title: "独立完成产物",
            detail:
              "A 核对来源与边界；B 制作 HTML 页面和短文案。演示中向 B 补充了一次指令，要求补齐文案并回传。",
          },
          {
            title: "回传并继续汇总",
            detail:
              "两个子会话都回传了文件引用；协作事件使汇总会话继续处理，随后读取三个实际文件。",
          },
          {
            title: "检查修订后交付",
            detail:
              "汇总检查修正了分工描述、示意与真实执行混淆，以及“风险动作必定审批”的表述。展示的是经检查与补充指令的版本。",
          },
        ],
        filename: "launch-copy.md",
        downloadUrl: "/demo/launch/launch-copy.md",
        documentTitle: "xAgent 产品首发包",
        documentSubtitle: "真实交付摘要 · 经检查与补充指令",
        sections: [
          {
            heading: "01 / 离线产品页面",
            body: "launch.html：介绍适用人群、能力、准备事项和本次协作过程；没有注册表单或外部资源，入口指向官方文档。",
          },
          {
            heading: "02 / 首发短文案",
            body: "launch-copy.md：204 个非空白字符的正文，保留同用户会话、工具配置和实际审批规则等边界。",
          },
          {
            heading: "03 / 事实核对记录",
            body: "fact-check.md：按当次官方资料核对来源与限制，并区分文档机制和本轮实际观察。原件保留当时资料口径，仍需结合当前版本复核。",
          },
        ],
        relatedLabel: "了解真实会话协作",
        relatedHref: "/docs/guides/multi-agent-session-event-collaboration",
      },
      {
        id: "meeting",
        label: "会议与待办",
        icon: "notes",
        headline: "会议结束，下一步也清楚了。",
        prompt:
          "从这份会议记录提取决定、待办和未解决的问题。没有明确负责人的地方请标出来，别猜。",
        inputs: ["会议记录.md", "项目背景.pdf"],
        steps: [
          {
            title: "提交记录",
            detail: "上传已有文字记录，并说明希望保留哪些决定、任务和上下文。",
          },
          {
            title: "提取与归类",
            detail: "区分已经决定的事项与讨论中的建议，不把含糊表达变成承诺。",
          },
          {
            title: "留给人确认",
            detail:
              "把缺失的负责人、期限和争议列为待确认项，先交付可检查的草稿。",
          },
          {
            title: "交付行动清单",
            detail:
              "保存纪要和待办文件；需要通知相关人员时，再按授权与策略继续。",
          },
        ],
        filename: "meeting-actions.demo.md",
        documentTitle: "会议纪要与行动清单",
        documentSubtitle: "示例结构 · 不是实际会议记录",
        sections: [
          {
            heading: "01 / 已确认决定",
            body: "只记录材料中明确达成的决定，并保留必要的背景。",
          },
          {
            heading: "02 / 待办事项",
            body: "任务、负责人、期限逐项整理。信息未给出时明确标记“待确认”。",
          },
          {
            heading: "03 / 未解决问题",
            body: "把需要补充讨论的问题单独列出，作为下一次跟进的起点。",
          },
        ],
        relatedLabel: "从第一个任务开始",
        relatedHref: "/docs/getting-started/first-task",
      },
    ],
    en: [
      {
        id: "research",
        label: "Research & briefs",
        icon: "research",
        headline: "More material. A clearer picture.",
        prompt:
          "Turn these industry sources into a brief. Include sources, points of disagreement, and open questions. Show me a draft first.",
        inputs: [
          "industry-sources.pdf",
          "Reference links",
          "Research questions",
        ],
        steps: [
          {
            title: "Set the goal",
            detail:
              "Submit material on the web, or configure a scheduled or external trigger for repeat research.",
          },
          {
            title: "Divide the work",
            detail:
              "A main session can delegate research and synthesis to independent sessions and exchange source references.",
          },
          {
            title: "Keep you in control",
            detail:
              "Keep the draft in the workspace. Later external actions follow the configured approval policy.",
          },
          {
            title: "Deliver the brief",
            detail:
              "Save an editable file with conclusions, sources, and questions that still need checking.",
          },
        ],
        filename: "research-brief.demo.md",
        documentTitle: "Industry research brief",
        documentSubtitle: "Sample structure · Verify against real sources",
        sections: [
          {
            heading: "01 / Key observations",
            body: "Group sources around the same question. Separate established facts, different viewpoints, and tentative conclusions.",
          },
          {
            heading: "02 / Open questions",
            body: "Keep conflicting figures visible and note the time ranges and original sources still needed.",
          },
          {
            heading: "03 / Next steps",
            body: "Update conclusions once key evidence is available. Keep a source list for further investigation.",
          },
        ],
        relatedLabel: "Explore research and file capabilities",
        relatedHref: "/docs/manual/capabilities",
      },
      {
        id: "launch",
        label: "Launch preparation",
        icon: "notes",
        headline: "One launch kit. Two sessions working together.",
        prompt:
          "Use three official sources to prepare a launch kit for review. A checks facts; B creates an offline page and short copy. Collect, inspect, and revise the files without publishing them.",
        inputs: ["3 official sources", "Defined roles and deliverables"],
        steps: [
          {
            title: "Read and delegate",
            detail:
              "A coordinating session created two independent child sessions: A for fact-checking and B for the page and launch copy.",
          },
          {
            title: "Create independently",
            detail:
              "A checked sources and limits; B created HTML and short copy. B received one follow-up instruction to finish the copy and return its files.",
          },
          {
            title: "Return and resume",
            detail:
              "Both child sessions returned file references. Collaboration events resumed the coordinating session, which then read all three files.",
          },
          {
            title: "Review and deliver",
            detail:
              "Review corrected the role split, the distinction between illustration and execution, and blanket approval claims. This is a checked run with follow-up instructions, not an unattended first pass.",
          },
        ],
        filename: "launch-copy.md",
        downloadUrl: "/demo/launch/launch-copy.md",
        documentTitle: "xAgent product launch kit",
        documentSubtitle:
          "Actual deliverables summarized · Checked with follow-up instructions",
        sections: [
          {
            heading: "01 / Offline product page",
            body: "launch.html covers the audience, capabilities, setup, and this collaboration. It has no registration form or external resources; links lead to official docs.",
          },
          {
            heading: "02 / Short launch copy",
            body: "launch-copy.md contains 204 non-whitespace Chinese characters of main copy. It retains same-user, tool-configuration, and policy-dependent approval limits.",
          },
          {
            heading: "03 / Fact-check record",
            body: "fact-check.md compares claims with the official sources read during the run, separating documentation from observed execution. This original snapshot still needs checking against current versions.",
          },
        ],
        relatedLabel: "Explore session collaboration",
        relatedHref: "/docs/guides/multi-agent-session-event-collaboration",
      },
      {
        id: "meeting",
        label: "Meetings & actions",
        icon: "notes",
        headline: "Leave the meeting with a next step.",
        prompt:
          "Extract decisions, actions, and open questions from these notes. Flag missing owners instead of guessing.",
        inputs: ["meeting-notes.md", "project-background.pdf"],
        steps: [
          {
            title: "Share the notes",
            detail:
              "Upload written notes and explain which decisions, tasks, and context the output should preserve.",
          },
          {
            title: "Extract and organize",
            detail:
              "Separate confirmed decisions from suggestions without turning vague discussion into commitments.",
          },
          {
            title: "Leave room to confirm",
            detail:
              "Mark missing owners, deadlines, and disputed points for review in a checkable draft.",
          },
          {
            title: "Deliver the action list",
            detail:
              "Save notes and actions as files. Any later notification follows your authorization and policy.",
          },
        ],
        filename: "meeting-actions.demo.md",
        documentTitle: "Meeting notes & action list",
        documentSubtitle: "Sample structure · Not a real meeting record",
        sections: [
          {
            heading: "01 / Confirmed decisions",
            body: "Record only decisions explicitly supported by the notes, with the context needed to understand them.",
          },
          {
            heading: "02 / Action items",
            body: "List each task, owner, and deadline. Mark missing information as “To confirm”.",
          },
          {
            heading: "03 / Open questions",
            body: "Keep unresolved questions together as a starting point for the next follow-up.",
          },
        ],
        relatedLabel: "Try your first task",
        relatedHref: "/docs/getting-started/first-task",
      },
    ],
  },
  containerClass = "xagent-home-container",
  eyebrowClass = "xagent-home-eyebrow",
  primaryClass = "xagent-home-primary",
  sectionHeaderClass = "xagent-home-section-header",
  textLinkClass = "xagent-home-text-link",
  anchorAliasClass = "xagent-home-anchor-alias",
  slipLabelClass = "xagent-home-slip-label",
  flowSignalClass = "xagent-home-flow-signal",
  siteUrl = "https://xagent.xiagaogao.com";
function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, ReactNode> = {
    arrow: (
      <React.Fragment>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </React.Fragment>
    ),
    research: (
      <React.Fragment>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 5 5M7 10h6M10 7v6" />
      </React.Fragment>
    ),
    chart: (
      <React.Fragment>
        <path d="M4 3v17h17M8 15V9M13 15V5M18 15v-4" />
      </React.Fragment>
    ),
    notes: (
      <React.Fragment>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </React.Fragment>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    file: (
      <React.Fragment>
        <path d="M13 3H5v18h14V9zM13 3v6h6M9 14h6M9 17h4" />
      </React.Fragment>
    ),
    server: (
      <React.Fragment>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="14" width="18" height="7" rx="2" />
        <path d="M7 7.5h.01M7 17.5h.01M12 7.5h5M12 17.5h5" />
      </React.Fragment>
    ),
    shield: (
      <React.Fragment>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" />
        <path d="m8 12 3 3 5-6" />
      </React.Fragment>
    ),
    branch: (
      <React.Fragment>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="5" r="2" />
        <circle cx="6" cy="19" r="2" />
        <path d="M6 7v10M18 7v2a5 5 0 0 1-5 5H6" />
      </React.Fragment>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    download: (
      <React.Fragment>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </React.Fragment>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
function handleTabKey(
  event: KeyboardEvent<HTMLButtonElement>,
  selected: number,
  count: number,
  select: (index: number) => void,
  prefix: string,
) {
  let next =
    "ArrowRight" === event.key
      ? (selected + 1) % count
      : "ArrowLeft" === event.key
        ? (selected - 1 + count) % count
        : "Home" === event.key
          ? 0
          : "End" === event.key
            ? count - 1
            : void 0;
  void 0 !== next &&
    (event.preventDefault(),
    select(next),
    document.getElementById(`${prefix}-${next}`)?.focus());
}
function WorkflowTheater({ en }: { en: boolean }) {
  let sectionRef = useRef<HTMLElement | null>(null),
    [stage, setStage] = useState(0),
    [playing, setPlaying] = useState(true),
    [inView, setInView] = useState(false),
    [reducedMotion, setReducedMotion] = useState(false),
    text = (zh: string, english: string) => (en ? english : zh);
  (useEffect(() => {
    if (!window.matchMedia) return;
    let e = window.matchMedia("(prefers-reduced-motion: reduce)"),
      s = () => {
        (setReducedMotion(e.matches), e.matches && setPlaying(false));
      };
    return (
      s(),
      e.addEventListener("change", s),
      () => e.removeEventListener("change", s)
    );
  }, []),
    useEffect(() => {
      if (!sectionRef.current || typeof IntersectionObserver === "undefined")
        return;
      let e = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
        threshold: 0.3,
      });
      return (e.observe(sectionRef.current), () => e.disconnect());
    }, []));
  let moving = playing && inView && !reducedMotion;
  useEffect(() => {
    if (!moving) return;
    let e = window.setInterval(() => setStage((e) => (e + 1) % 4), 3200);
    return () => window.clearInterval(e);
  }, [moving]);
  let stages = [
    {
      label: text("给出目标", "Set the goal"),
      title: text("一句话，工作开始。", "One request starts the work."),
      body: text(
        "在会话里发起任务，也可以按配置通过定时或外部触发器启动。",
        "Start in a session, or use configured scheduled and external triggers.",
      ),
      note: text("目标 + 材料 + 交付要求", "GOAL + SOURCES + OUTPUT"),
    },
    {
      label: text("分工推进", "Delegate"),
      title: text("把复杂，拆成几件事。", "Make complex work manageable."),
      body: text(
        "在同一用户工作区内，将子任务交给独立会话。各自处理，再汇总结果。",
        "Delegate subtasks to independent sessions within the same user workspace, then collect the results.",
      ),
      note: text(
        "独立会话 · 工具执行 · 结果汇总",
        "SESSIONS · TOOLS · SYNTHESIS",
      ),
    },
    {
      label: text("关键确认", "Review"),
      title: text(
        "该你把关时，停下来。",
        "Pause where your policy calls for it.",
      ),
      body: text(
        "操作是否等待审批，由实际规则决定。你可以查看请求，再允许或拒绝。",
        "Your configured rules decide which actions require approval. Inspect the request, then allow or deny it.",
      ),
      note: text(
        "按策略审批，不等于所有动作都审批",
        "APPROVAL DEPENDS ON POLICY",
      ),
    },
    {
      label: text("留下交付", "Keep the files"),
      title: text("带走文件，继续工作。", "Keep the files. Keep working."),
      body: text(
        "在会话里查看报告与文件，补充要求、核查结论，再继续修改。",
        "Inspect reports and files in the session. Add requirements, verify the conclusions, and revise.",
      ),
      note: text("可检查 · 可修改 · 可继续", "INSPECT · REVISE · CONTINUE"),
    },
  ];
  return (
    <section
      ref={sectionRef}
      className="xagent-home-theater"
      data-moving={moving}
      data-stage={stage}
      aria-labelledby="theater-title"
    >
      <div className={containerClass}>
        <div className="xagent-home-theater-heading">
          <div>
            <p className={eyebrowClass}>
              {text("工作，不必停在一句回答。", "GO BEYOND AN ANSWER.")}
            </p>
            <Heading as="h2" id="theater-title">
              {text("让每一步，", "Every step.")}
              <br />
              <span>{text("都朝着结果走。", "Toward a result.")}</span>
            </Heading>
          </div>
          <div className="xagent-home-theater-controls">
            <span>
              {text("流程示意 · 非实时任务", "ILLUSTRATION · NOT A LIVE TASK")}
            </span>
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-pressed={playing && !reducedMotion}
              disabled={reducedMotion}
            >
              {reducedMotion
                ? text("已减少动画", "Reduced motion")
                : playing
                  ? text("暂停动画", "Pause motion")
                  : text("播放动画", "Play motion")}
              <span aria-hidden="true">
                {playing && !reducedMotion ? "Ⅱ" : "▷"}
              </span>
            </button>
          </div>
        </div>
        <div className="xagent-home-theater-body">
          <div className="xagent-home-orchestration" aria-hidden="true">
            <svg
              className="xagent-home-flow-wires"
              viewBox="0 0 700 330"
              preserveAspectRatio="none"
            >
              <path d="M70 165H240M240 165C265 165 240 75 285 75H380C420 75 405 165 440 165H625M240 165C265 165 240 255 285 255H380C420 255 405 165 440 165" />
              <path
                className={flowSignalClass}
                d="M70 165H240C265 165 240 75 285 75H380C420 75 405 165 440 165H625"
              />
              <path
                className={flowSignalClass}
                d="M70 165H240C265 165 240 255 285 255H380C420 255 405 165 440 165H625"
              />
            </svg>
            <div className="xagent-home-goal-node" data-active={0 === stage}>
              <Icon name="notes" />
              <strong>{text("任务", "REQUEST")}</strong>
              <small>{text("开始", "START")}</small>
            </div>
            <div className="xagent-home-agent-nodes" data-active={1 === stage}>
              <div>
                <Icon name="research" />
                <span>{text("整理材料", "Research")}</span>
                <i />
              </div>
              <div>
                <Icon name="chart" />
                <span>{text("处理文件", "Files")}</span>
                <i />
              </div>
              <small>{text("独立子会话", "INDEPENDENT SESSIONS")}</small>
            </div>
            <div className="xagent-home-review-node" data-active={2 === stage}>
              <Icon name="shield" />
              <strong>{text("审批", "REVIEW")}</strong>
              <small>{text("按策略", "BY POLICY")}</small>
            </div>
            <div className="xagent-home-result-node" data-active={3 === stage}>
              <Icon name="file" />
              <strong>{text("交付", "OUTPUT")}</strong>
              <small>{".md / .csv"}</small>
            </div>
          </div>
          <div className="xagent-home-stage-story" key={stage}>
            <span className="xagent-home-stage-counter">
              {"0"}
              {stage + 1}
              <small>{"/ 04"}</small>
            </span>
            <h3>{stages[stage].title}</h3>
            <p>{stages[stage].body}</p>
            <span className="xagent-home-stage-note">{stages[stage].note}</span>
          </div>
        </div>
        <div
          className="xagent-home-theater-steps"
          aria-label={text("选择流程阶段", "Choose workflow stage")}
        >
          {stages.map((e, s) => (
            <button
              type="button"
              aria-pressed={stage === s}
              aria-label={e.label}
              onClick={() => {
                (setStage(s), setPlaying(false));
              }}
              key={e.label}
            >
              <span>
                {"0"}
                {s + 1}
              </span>
              {e.label}
              <i key={`${stage}-${playing}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
function Home() {
  let { i18n: i18n } = useDocusaurusContext(),
    en = "en" === i18n.currentLocale,
    locale: "en" | "zh" = en ? "en" : "zh",
    heroImage = "/img/home/current/xagent-launch-page.webp",
    text = (zh: string, english: string) => (en ? english : zh),
    localize = (url: string) => (en ? `/en${url}` : url),
    [scenarioIndex, setScenarioIndex] = useState(1),
    [stepIndex, setStepIndex] = useState(3),
    [galleryIndex, setGalleryIndex] = useState(0),
    { openImage: openImage } = useImageLightbox(),
    scenario = scenarios[locale][scenarioIndex],
    selectScenario = (e: number) => {
      (setScenarioIndex(e), setStepIndex(3));
    },
    gallery = [
      {
        label: text("任务与会话", "Tasks & sessions"),
        image: "xagent-launch-session",
        title: text(
          "过程看得见，结果接得住。",
          "See the work. Keep the result.",
        ),
        description: text(
          "在会话里补充要求、查看工具执行和文件产物。复杂任务可以拆成独立会话，各自推进，再汇总结果。",
          "Add requirements, inspect execution, and find files in the session. Complex tasks can use independent sessions, then bring their results together.",
        ),
        link: "/docs/user-guide/agent-session",
        icon: "branch",
      },
      {
        label: text("可复用的助手", "Reusable agents"),
        image: "xagent-agent-management",
        title: text(
          "好用的做法，下次接着用。",
          "A good workflow is worth keeping.",
        ),
        description: text(
          "把验证过的做事方法沉淀为 Skill，把角色与能力组合成专用助手。管理员准备好，用户选择后就能开始。",
          "Turn tested methods into Skills and combine roles and capabilities into dedicated agents. Admins prepare them so users can get started.",
        ),
        link: "/docs/user-guide/agent-management",
        icon: "notes",
      },
      {
        label: text("发现可用技能", "Discover available Skills"),
        image: "xagent-skills",
        title: text(
          "需要什么能力，按任务来选。",
          "Pick capabilities for the task at hand.",
        ),
        description: text(
          "在技能页浏览可用的做事方法，再按任务需要加载。研究、写作、文件处理各有入口；具体效果仍需结合模型、工具与材料验证。",
          "Browse the available methods and load what your task needs. Research, writing, and file processing have dedicated entries; outcomes still depend on your model, tools, and sources.",
        ),
        link: "/docs/manual/capabilities",
        icon: "server",
      },
    ],
    selectedGallery = gallery[galleryIndex],
    galleryImage = `/img/home/current/${selectedGallery.image}.webp`,
    galleryAlt = text(
      `xAgent ${selectedGallery.label}当前演示环境界面`,
      `xAgent ${selectedGallery.label.toLowerCase()} in the current demo environment (Chinese UI)`,
    ),
    title = text(
      "xAgent：把待办变成交付的 AI 工作门户",
      "xAgent: Turn your to-do list into deliverables",
    ),
    description = text(
      "把研究、表格和会议记录交给 xAgent，在自己的服务器上推进任务、按策略审批关键动作，并交付可检查的报告与文件。",
      "Give xAgent your research, spreadsheets, and meeting notes. Run tasks on your own server, review key actions under your policies, and keep checkable reports and files.",
    ),
    canonicalUrl = `${siteUrl}${en ? "/en" : ""}/`,
    demoMarkdown = `# ${scenario.documentTitle}

DEMO — ${scenario.documentSubtitle}

${scenario.sections
  .map(
    (e) => `## ${e.heading}

${e.body}`,
  )
  .join("\n\n")}

${text("这是官网交互演示的预设示例，不是实际 AI 执行结果。", "This is a preset website demo, not the result of a live AI task.")}
`,
    structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          dateModified: contentDates.homepage.modified,
          inLanguage: en ? "en-US" : "zh-CN",
          isPartOf: {"@id": `${canonicalUrl}#website`},
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalUrl}#website`,
          name: "xAgent",
          url: canonicalUrl,
          description: description,
          inLanguage: en ? "en-US" : "zh-CN",
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${siteUrl}/#software`,
          name: "xAgent",
          url: canonicalUrl,
          description: description,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Linux, macOS",
          softwareVersion: productRelease.version,
          downloadUrl:
            "https://downloads.xagent.xiagaogao.com/scripts/install.sh",
          releaseNotes: `${canonicalUrl}docs/changelog/`,
          softwareHelp: {
            "@type": "WebPage",
            url: `${canonicalUrl}docs/manual/overview/`,
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: text(
              "免费二进制版本用于体验和评估；模型与基础设施费用另计。",
              "Free binary edition for evaluation; model and infrastructure costs are separate.",
            ),
            url: `${canonicalUrl}docs/getting-started/install/`,
          },
        },
      ],
    };
  return (
    <Layout title={title} description={description}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <main className="xagent-home-page">
        <section className="xagent-home-hero" aria-labelledby="hero-title">
          <div className="xagent-home-hero-grid" aria-hidden="true" />
          <div className={containerClass}>
            <div className="xagent-home-hero-topline">
              <span className="xagent-home-live-dot" />
              {text(
                "你的服务器，你的 AI 工作台",
                "YOUR SERVER. YOUR AI WORKSPACE.",
              )}
              <a href={localize("/docs/changelog/")}>
                {`v${productRelease.version} `}
                <span aria-hidden="true">{"↗"}</span>
              </a>
            </div>
            <div className="xagent-home-hero-layout">
              <div className="xagent-home-hero-copy">
                <p className={eyebrowClass}>{"FROM TO-DO TO DONE"}</p>
                <Heading as="h1" id="hero-title" className="xagent-home-title">
                  {text("把待办，", "From to-do.")}
                  <br />
                  <span>{text("变成交付。", "To delivered.")}</span>
                </Heading>
                <p className="xagent-home-subtitle">
                  {text(
                    "资料太散，步骤太多？把目标交给 xAgent。",
                    "Too many sources. Too many steps. Give xAgent the goal.",
                  )}
                  <br />
                  {text(
                    "让研究有结论、表格成报告、会议留下行动。",
                    "Turn research into briefs, sheets into reports, and meetings into next steps.",
                  )}
                </p>
                <div className="xagent-home-actions">
                  <a className={primaryClass} href="#demo">
                    {text("看看它怎么做", "See it in action")}
                    <Icon name="arrow" />
                  </a>
                  <a
                    className="xagent-home-hero-secondary"
                    href={localize("/docs/getting-started/install/")}
                  >
                    {text("开始部署", "Start deploying")}{" "}
                    <span aria-hidden="true">{"↗"}</span>
                  </a>
                </div>
                <p className="xagent-home-hero-note">
                  {text(
                    "可私有化部署 · 多用户工作区 · 按策略审批",
                    "Self-hosted · Multi-user workspaces · Policy-based approvals",
                  )}
                </p>
              </div>
              <div className="xagent-home-product-stage">
                <div className="xagent-home-request-slip">
                  <span className={slipLabelClass}>
                    {text("这次的任务", "THE REQUEST")}
                  </span>
                  <p>
                    {text(
                      "根据官方资料，准备一个产品首发包。",
                      "Prepare a product launch kit from official sources.",
                    )}
                  </p>
                  <span className="xagent-home-slip-file">
                    <Icon name="file" />{" "}
                    {text("3 篇官方资料", "3 official sources")}
                  </span>
                  <span className="xagent-home-slip-arrow" aria-hidden="true">
                    {"↘"}
                  </span>
                </div>
                <div className="xagent-home-hero-visual">
                  <div className="xagent-home-window-bar">
                    <span
                      className="xagent-home-window-dots"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{"xAgent / workspace"}</span>
                    <span className="xagent-home-window-badge">
                      {text("真实产品界面", "PRODUCT INTERFACE")}
                    </span>
                  </div>
                  <button
                    className="xagent-home-hero-image"
                    type="button"
                    aria-label={text(
                      "放大 xAgent 产品首发包真实页面截图",
                      "Enlarge the actual xAgent launch-kit page screenshot",
                    )}
                    onClick={(e) =>
                      openImage(
                        {
                          src: heroImage,
                          alt: text(
                            "xAgent 实际生成的首发页面，经检查与补充指令，仅供审阅",
                            "Actual launch page in xAgent, checked with follow-up instructions and prepared for review",
                          ),
                        },
                        e.currentTarget,
                      )
                    }
                  >
                    <img
                      src={heroImage}
                      srcSet="/img/home/current/xagent-launch-page-720.webp 720w, /img/home/current/xagent-launch-page-1040.webp 1040w, /img/home/current/xagent-launch-page.webp 1180w"
                      sizes="(max-width: 900px) 92vw, 82vw"
                      alt={text(
                        "xAgent 当前演示环境实际生成的产品首发页面，经检查与补充指令",
                        "An actual product launch page in the current xAgent environment, checked with follow-up instructions",
                      )}
                      width="1180"
                      height="757"
                      fetchPriority="high"
                    />
                  </button>
                  <p className="xagent-home-screenshot-note">
                    {text(
                      "真实执行留档 · 经检查与补充指令 · 仅供审阅",
                      "Actual execution record · Checked with follow-up instructions · For review",
                    )}
                  </p>
                </div>
                <div className="xagent-home-delivery-slip">
                  <span className={slipLabelClass}>
                    {text("真实任务留档", "ACTUAL TASK ARTIFACTS")}
                  </span>
                  <strong>
                    {text("结果，留在文件里。", "The result is in the files.")}
                  </strong>
                  <div>
                    <span>{"MD"}</span>
                    {text("首发文案", "Launch copy")}
                    <Icon name="check" />
                  </div>
                  <div>
                    <span>{"MD"}</span>
                    {text("事实核对", "Fact check")}
                    <Icon name="check" />
                  </div>
                  <div>
                    <span>{"HTML"}</span>
                    {text("首发页面", "Launch page")}
                    <Icon name="check" />
                  </div>
                  <small>
                    {text(
                      "经过检查与补充指令",
                      "Checked with follow-up instructions",
                    )}
                  </small>
                </div>
              </div>
            </div>
            <div className="xagent-home-hero-benefits">
              {[
                [
                  text("01 / 说清目标", "01 / SET THE GOAL"),
                  text("从手头的材料开始", "Start with what you have"),
                ],
                [
                  text("02 / 推进工作", "02 / MOVE WORK FORWARD"),
                  text(
                    "分工、工具与关键确认",
                    "Delegation, tools, and approvals",
                  ),
                ],
                [
                  text("03 / 拿到结果", "03 / KEEP THE RESULT"),
                  text(
                    "可查看、可修改的文件",
                    "Files you can inspect and edit",
                  ),
                ],
              ].map(([e, s]) => (
                <div key={e}>
                  <span>{e}</span>
                  <strong>{s}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
        <WorkflowTheater en={en} />
        <section
          className="xagent-home-demo-section"
          id="demo"
          aria-labelledby="demo-title"
        >
          <div className={containerClass}>
            <div className={sectionHeaderClass}>
              <div>
                <p className={eyebrowClass}>
                  {text("先看结果，再看原理", "START WITH THE OUTCOME")}
                </p>
                <span
                  id="workflow-title"
                  className={anchorAliasClass}
                  aria-hidden="true"
                />
                <Heading as="h2" id="demo-title">
                  {text(
                    "你想先交给它哪件事？",
                    "What would you hand over first?",
                  )}
                </Heading>
              </div>
              <p>
                {text(
                  "选一个场景，点开每一步。",
                  "Pick a scenario. Explore every step.",
                )}
                <br />
                {text(
                  "看看一句需求如何走向一份交付。",
                  "See how a request becomes a deliverable.",
                )}
              </p>
            </div>
            <div
              className="xagent-home-scenario-tabs"
              role="tablist"
              aria-label={text("任务场景", "Task scenarios")}
            >
              {scenarios[locale].map((e, s) => (
                <button
                  id={`scenario-${s}`}
                  type="button"
                  role="tab"
                  aria-selected={s === scenarioIndex}
                  aria-controls="scenario-panel"
                  tabIndex={s === scenarioIndex ? 0 : -1}
                  onClick={() => selectScenario(s)}
                  onKeyDown={(e) =>
                    handleTabKey(e, s, 3, selectScenario, "scenario")
                  }
                  key={e.id}
                >
                  <Icon name={e.icon} />
                  {e.label}
                  <span aria-hidden="true">{"↗"}</span>
                </button>
              ))}
            </div>
            <div
              className="xagent-home-demo-frame"
              role="tabpanel"
              id="scenario-panel"
              aria-labelledby={`scenario-${scenarioIndex}`}
            >
              <div className="xagent-home-demo-toolbar">
                <span>
                  <span className="xagent-home-demo-pill">{"DEMO"}</span>
                  {text("交互示例", "INTERACTIVE EXAMPLE")}
                </span>
                <small>
                  {text(
                    scenario.downloadUrl
                      ? "真实演示留档，不实时调用 AI"
                      : "预设内容，不调用 AI 或发送数据",
                    scenario.downloadUrl
                      ? "Recorded real demo. No live AI calls."
                      : "Preset content. No AI calls or data submission.",
                  )}
                </small>
              </div>
              <div className="xagent-home-demo-columns">
                <div className="xagent-home-demo-input">
                  <span className="xagent-home-label">
                    {text("你的一句话", "YOUR REQUEST")}
                  </span>
                  <h3>{scenario.headline}</h3>
                  <p className="xagent-home-prompt">{scenario.prompt}</p>
                  <div className="xagent-home-input-files">
                    {scenario.inputs.map((e) => (
                      <span key={e}>
                        <Icon name="file" />
                        {e}
                      </span>
                    ))}
                  </div>
                  <div
                    className="xagent-home-flow-steps"
                    aria-label={text(
                      "点击查看执行步骤",
                      "Explore the workflow steps",
                    )}
                  >
                    {scenario.steps.map((e, s) => (
                      <button
                        type="button"
                        aria-pressed={stepIndex === s}
                        aria-controls="step-detail"
                        onClick={() => setStepIndex(s)}
                        key={e.title}
                      >
                        <span className="xagent-home-step-number">
                          {String(s + 1).padStart(2, "0")}
                        </span>
                        <span>{e.title}</span>
                        <Icon
                          name={
                            3 === s
                              ? "file"
                              : 2 === s
                                ? "shield"
                                : 1 === s
                                  ? "branch"
                                  : "notes"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <p
                    className="xagent-home-step-detail"
                    id="step-detail"
                    aria-live="polite"
                  >
                    {scenario.steps[stepIndex].detail}
                  </p>
                </div>
                <div className="xagent-home-demo-output">
                  <div className="xagent-home-output-header">
                    <span>
                      <Icon name="file" />
                      {scenario.downloadUrl
                        ? text("交付摘要", "DELIVERABLE SUMMARY")
                        : text("交付预览", "DELIVERABLE PREVIEW")}
                    </span>
                    <span>{".md"}</span>
                  </div>
                  <article className="xagent-home-document" key={scenario.id}>
                    <div className="xagent-home-document-brand">
                      {"xAgent "}
                      <span>{"WORKSPACE / DEMO"}</span>
                    </div>
                    <h3>{scenario.documentTitle}</h3>
                    <p className="xagent-home-document-subtitle">
                      {scenario.documentSubtitle}
                    </p>
                    {scenario.sections.map((e) => (
                      <div
                        className="xagent-home-document-section"
                        key={e.heading}
                      >
                        <h4>{e.heading}</h4>
                        <p>{e.body}</p>
                      </div>
                    ))}
                    <div className="xagent-home-document-footer">
                      <span>
                        {scenario.downloadUrl
                          ? text(
                              "真实产物 · 供审阅",
                              "ACTUAL FILES · FOR REVIEW",
                            )
                          : text("草稿 · 待你核对", "DRAFT · FOR YOUR REVIEW")}
                      </span>
                      <span>{"01"}</span>
                    </div>
                  </article>
                  <div className="xagent-home-output-actions">
                    <a
                      href={
                        scenario.downloadUrl ??
                        `data:text/markdown;charset=utf-8,${encodeURIComponent(demoMarkdown)}`
                      }
                      download={scenario.filename}
                    >
                      <Icon name="download" />
                      {scenario.downloadUrl
                        ? text(
                            "下载首发文案（中文）",
                            "Download launch copy (Chinese)",
                          )
                        : text("下载示例文件", "Download sample")}
                    </a>
                    <a href={localize(scenario.relatedHref)}>
                      {scenario.relatedLabel}
                      <Icon name="arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="xagent-home-demo-footnote">
              {text(
                "研究与会议为预设示例；首发包来自一次真实的双子会话协作，经过检查与补充指令，并非无人干预的一次完成。这里展示的是留档，不实时调用 AI。",
                "Research and meeting examples are presets. The launch kit records an actual two-child-session workflow, checked with follow-up instructions rather than completed unattended in one pass. This page shows a record, not live AI.",
              )}
            </p>
            <div className="xagent-home-launch-downloads">
              <a
                className={primaryClass}
                href="/demo/launch/xagent-launch-demo.zip"
                download={true}
              >
                {text("下载完整首发包", "Download the launch kit")}
                <Icon name="download" />
              </a>
              <span>
                {text(
                  "HTML 页面 + 短文案 + 事实核对 · 演示原件",
                  "HTML page + launch copy + fact check · Original demo files",
                )}
              </span>
            </div>
            <details id="recorded-demo" className="xagent-home-launch-evidence">
              <summary>
                <span>
                  {text(
                    "展开真实协作过程与边界",
                    "See the actual handoff and its limits",
                  )}
                </span>
                <span>
                  {text(
                    "两个子会话 · 三个文件",
                    "Two child sessions · Three files",
                  )}
                </span>
                <Icon name="plus" />
              </summary>
              <div className="xagent-home-evidence-body">
                <p>
                  {text(
                    "汇总会话创建了 A「事实核对」和 B「页面与文案」。两者通过协作事件回传文件引用后，汇总会话继续读取与检查。B 曾收到一次补充指令以完成短文案并回传；最终又修订了错误的分工与审批表述。",
                    "The coordinator created A for fact-checking and B for the page and copy. Both returned file references through collaboration events, after which the coordinator resumed reading and review. B received one follow-up to finish and return the copy; the final review also corrected role and approval claims.",
                  )}
                </p>
                <div className="xagent-home-evidence-gallery">
                  {[
                    [
                      "xagent-launch-handoff",
                      text(
                        "01 / 真实协作记录：创建与派工",
                        "01 / Actual collaboration record: creation and delegation",
                      ),
                    ],
                    [
                      "xagent-launch-session",
                      text(
                        "02 / 核对后汇总三个文件",
                        "02 / Review and collect three files",
                      ),
                    ],
                  ].map(([e, s]) => (
                    <figure key={e}>
                      <button
                        type="button"
                        aria-label={text(
                          `放大${s}截图`,
                          `Enlarge ${s.toLowerCase()}`,
                        )}
                        onClick={(a) =>
                          openImage(
                            {
                              src: `/img/home/current/${e}.webp`,
                              alt: s,
                            },
                            a.currentTarget,
                          )
                        }
                      >
                        <img
                          src={`/img/home/current/${e}.webp`}
                          width="1180"
                          height="690"
                          loading="lazy"
                          alt={s}
                        />
                        <span>
                          {text("点击放大", "Enlarge")} <Icon name="plus" />
                        </span>
                      </button>
                      <figcaption>{s}</figcaption>
                    </figure>
                  ))}
                </div>
                <p>
                  {text(
                    "本次汇总使用 OpenAI-6.1-sol，两个子会话使用 Qwen3.8-27B。只验证本次明确分工和文件交接，不代表所有模型或复杂任务都能复现同样结果；本次没有实测外发审批。",
                    "This run used OpenAI-6.1-sol for coordination and Qwen3.8-27B for both child sessions. It validates this bounded handoff, not identical results across all models or complex tasks. External-action approval was not tested in this run.",
                  )}
                </p>
                <p>
                  {text(
                    "下载内容由产品预览导出，保留当次官方资料的核对口径；部分能力描述仍需按当前版本复核，尤其是 Word 编辑能力。它不是最新能力总表，也不代表已验证产品原生下载按钮。",
                    "The files were exported from product previews and preserve the sources checked during that run. Some capability descriptions still need checking against current versions, especially Word editing. This is not a current capability catalog or proof that the product download button was validated.",
                  )}
                </p>
                <div className="xagent-home-evidence-links">
                  <a href="/demo/launch/launch-copy.md" download={true}>
                    {text("首发文案原件", "Original launch copy")}
                    <Icon name="download" />
                  </a>
                  <a href="/demo/launch/fact-check.md" download={true}>
                    {text("当次事实核对原件", "Original fact-check snapshot")}
                    <Icon name="download" />
                  </a>
                  <a href={localize("/docs/manual/capabilities/")}>
                    {text("查看当前能力说明", "Read the capability guide")}
                    <Icon name="arrow" />
                  </a>
                </div>
              </div>
            </details>
          </div>
        </section>
        <section
          className="xagent-home-workbench-section"
          id="workbench"
          aria-labelledby="workbench-title"
        >
          <div className={containerClass}>
            <div className={sectionHeaderClass}>
              <div>
                <p className={eyebrowClass}>
                  {text("从示例，回到工作台", "THE WORKSPACE BEHIND THE WORK")}
                </p>
                <span
                  id="capabilities-title"
                  className={anchorAliasClass}
                  aria-hidden="true"
                />
                <Heading as="h2" id="workbench-title">
                  {text("有进展，也有来龙去脉。", "Progress you can follow.")}
                </Heading>
              </div>
              <a
                className={textLinkClass}
                href={localize("/docs/manual/overview/")}
              >
                {text("打开完整使用手册", "Explore the full manual")}
                <Icon name="arrow" />
              </a>
            </div>
            <div
              className="xagent-home-workbench-tabs"
              role="tablist"
              aria-label={text("产品界面", "Product views")}
            >
              {gallery.map((e, s) => (
                <button
                  id={`view-${s}`}
                  type="button"
                  role="tab"
                  aria-selected={galleryIndex === s}
                  aria-controls="view-panel"
                  tabIndex={galleryIndex === s ? 0 : -1}
                  onClick={() => setGalleryIndex(s)}
                  onKeyDown={(e) =>
                    handleTabKey(e, s, gallery.length, setGalleryIndex, "view")
                  }
                  key={e.label}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <div
              className="xagent-home-workbench-panel"
              role="tabpanel"
              id="view-panel"
              aria-labelledby={`view-${galleryIndex}`}
            >
              <div className="xagent-home-workbench-copy">
                <span className="xagent-home-feature-icon">
                  <Icon name={selectedGallery.icon} />
                </span>
                <h3>{selectedGallery.title}</h3>
                <p>{selectedGallery.description}</p>
                <a
                  className={textLinkClass}
                  href={localize(selectedGallery.link)}
                >
                  {text("了解怎么用", "See how it works")}
                  <Icon name="arrow" />
                </a>
                <p className="xagent-home-asset-note">
                  {text(
                    "2026-10-01 当前演示环境截图；能力列表不代表所有项目均已实测。",
                    "Captured from the current Chinese demo environment on 2026-10-01. Listed capabilities are not all validated by this demo.",
                  )}
                </p>
              </div>
              <button
                type="button"
                className="xagent-home-workbench-image"
                aria-label={text(
                  `放大${selectedGallery.label}截图`,
                  `Enlarge ${selectedGallery.label.toLowerCase()} screenshot`,
                )}
                onClick={(e) =>
                  openImage(
                    {
                      src: galleryImage,
                      alt: galleryAlt,
                    },
                    e.currentTarget,
                  )
                }
                key={selectedGallery.image}
              >
                <img
                  src={galleryImage}
                  srcSet={`${galleryImage.replace(".webp", "-720.webp")} 720w, ${galleryImage.replace(".webp", "-1040.webp")} 1040w, ${galleryImage} 1180w`}
                  sizes="(max-width: 900px) 90vw, 65vw"
                  alt={galleryAlt}
                  width="1180"
                  height="690"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  {text("点击放大", "Click to enlarge")} <Icon name="plus" />
                </span>
              </button>
            </div>
          </div>
        </section>
        <section
          className="xagent-home-control-section"
          aria-labelledby="control-title"
        >
          <div className={containerClass}>
            <div className="xagent-home-control-intro">
              <p className={eyebrowClass}>
                {text(
                  "能力交给 AI，边界由你来定",
                  "CAPABLE BY DESIGN. BOUNDED BY YOUR CHOICES.",
                )}
              </p>
              <Heading as="h2" id="control-title">
                {text(
                  "放手做事，保留把关。",
                  "Delegate the work. Keep a hand on the controls.",
                )}
              </Heading>
            </div>
            <div className="xagent-home-control-grid">
              {[
                {
                  icon: "server",
                  title: text("运行在你的环境", "Run it in your environment"),
                  text: text(
                    "服务部署在自己的服务器，用户工作区分开管理。模型和外部连接的数据流由实际配置决定。",
                    "Deploy on your server with separate user workspaces. Model and connector data flows depend on your configuration.",
                  ),
                  href: "/docs/guides/self-hosted-ai-agent",
                },
                {
                  icon: "shield",
                  title: text(
                    "关键动作，按策略确认",
                    "Review actions under your policy",
                  ),
                  text: text(
                    "为发送、修改等操作设置审批规则。查看请求、允许或拒绝，让执行边界有据可查。",
                    "Configure approval rules for actions such as sending or modifying. Inspect requests and choose whether they proceed.",
                  ),
                  href: "/docs/guides/agent-approval-security",
                },
                {
                  icon: "chart",
                  title: text("看看能力用在了哪里", "Understand usage"),
                  text: text(
                    "查看个人模型、Token 与工具使用情况；管理员可查看更大范围的统计。",
                    "Review personal model, token, and tool usage. Administrators can access broader usage statistics.",
                  ),
                  href: "/docs/manual/analytics",
                },
              ].map((e) => (
                <a
                  href={localize(e.href)}
                  className="xagent-home-control-card"
                  key={e.title}
                >
                  <Icon name={e.icon} />
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                  <span>
                    {text("查看能力与边界", "Read the details and limits")}{" "}
                    <Icon name="arrow" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section
          className="xagent-home-start-section"
          id="start"
          aria-labelledby="start-title"
        >
          <div className={containerClass}>
            <div className={sectionHeaderClass}>
              <div>
                <p className={eyebrowClass}>
                  {text("从一件小事开始", "START WITH ONE REAL TASK")}
                </p>
                <span
                  id="guides-title"
                  className={anchorAliasClass}
                  aria-hidden="true"
                />
                <Heading as="h2" id="start-title">
                  {text(
                    "让它做一次，你再决定。",
                    "Try a task. Then make the call.",
                  )}
                </Heading>
              </div>
              <p>
                {text(
                  "先用非敏感材料跑通一个场景，",
                  "Start with non-sensitive material.",
                )}
                <br />
                {text(
                  "再把适合的工作交给它。",
                  "Build confidence before expanding the scope.",
                )}
              </p>
            </div>
            <div className="xagent-home-start-grid">
              {[
                {
                  n: "01",
                  title: text("准备运行环境", "Prepare the environment"),
                  body: text(
                    "安装服务端，接入可用模型，检查工作区与基础安全配置。",
                    "Install the server, connect a model, and check workspace and security settings.",
                  ),
                  action: text("查看部署指南", "Deployment guide"),
                  href: "/docs/getting-started/install/",
                },
                {
                  n: "02",
                  title: text("完成第一个任务", "Complete one task"),
                  body: text(
                    "带上目标、材料和交付要求。从一份能检查的文件开始。",
                    "Bring a clear goal, sources, and output requirements. Start with a file you can inspect.",
                  ),
                  action: text("跟着示例开始", "First-task guide"),
                  href: "/docs/getting-started/first-task/",
                },
                {
                  n: "03",
                  title: text("留下好用的做法", "Keep what works"),
                  body: text(
                    "验证结果后，把流程整理成可复用的 Skill 或专用智能体。",
                    "After reviewing the result, turn the method into a reusable Skill or dedicated agent.",
                  ),
                  action: text("创建可复用能力", "Create a reusable Skill"),
                  href: "/docs/getting-started/create-skill/",
                },
              ].map((e) => (
                <a
                  href={localize(e.href)}
                  className="xagent-home-start-card"
                  key={e.n}
                >
                  <span>{e.n}</span>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                  <strong>
                    {e.action}
                    <Icon name="arrow" />
                  </strong>
                </a>
              ))}
            </div>
            <div className="xagent-home-release-note">
              <span className="xagent-home-release-badge">{"BETA"}</span>
              <p>
                {text(
                  "免费二进制版本用于体验与评估。当前免费版支持 2 个用户、30 个会话；模型与服务器费用另计。",
                  "The free binary edition is for evaluation. It supports 2 users and 30 sessions; model and server costs are separate.",
                )}{" "}
                <a href={localize("/docs/getting-started/what-is-xagent/")}>
                  {text("查看完整定位与限制", "See positioning and limits")}
                  {" ↗"}
                </a>
              </p>
            </div>
            <div className="xagent-home-faq" id="roadmap-title">
              <Heading as="h2">
                {text("开始前，你可能想问", "Before you begin")}
              </Heading>
              <div>
                {[
                  [
                    text(
                      "需要每个人都安装吗？",
                      "Does everyone need to install it?",
                    ),
                    text(
                      "不需要。管理员部署服务端后，用户通过网页或已配置的消息渠道使用。服务端需要保持在线；模型和外部服务需分别配置。",
                      "No. Once an administrator deploys the server, users access it through the web or configured messaging channels. The server must stay online, and models and external services need setup.",
                    ),
                  ],
                  [
                    text(
                      "这些示例是在实时运行吗？",
                      "Are these demos running live?",
                    ),
                    text(
                      "不是实时运行。研究与会议为预设示例；首发包、子会话交接与页面截图来自一次真实任务，经过检查和补充指令。上方动画为流程示意，不等于这次任务的逐秒执行记录。这里不调用模型、不上传材料。",
                      "Not live. Research and meeting examples are presets. The launch kit, session handoff, and page screenshots come from an actual task checked with follow-up instructions. The animation illustrates the workflow; it is not a second-by-second replay. This page makes no model calls or uploads.",
                    ),
                  ],
                  [
                    text(
                      "已经有协作能力，Team 还在规划什么？",
                      "What exists today, and what is still planned?",
                    ),
                    text(
                      "当前已有同一用户下的会话通知、协作事件和长期记忆能力。完整的项目级 Agent Team、进一步的记忆增强与知识库能力仍在后续规划中。",
                      "Session notifications, collaboration events within the same user, and long-term memory exist today. Full project-level Agent Teams, further memory improvements, and knowledge-base features are still planned.",
                    ),
                  ],
                ].map(([e, s]) => (
                  <details key={e}>
                    <summary>
                      {e}
                      <Icon name="plus" />
                    </summary>
                    <p>{s}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="xagent-home-closing">
              <div>
                <span>{"xAgent"}</span>
                <p>
                  {text(
                    "下一份交付，从这里开始。",
                    "Your next deliverable starts here.",
                  )}
                </p>
              </div>
              <a
                className={primaryClass}
                href={localize("/docs/getting-started/install/")}
              >
                {text("开始部署 xAgent", "Deploy xAgent")}
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
export default Home;
