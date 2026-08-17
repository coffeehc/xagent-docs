---
slug: why-i-built-xagent
title: Why I Built xAgent
date: 2026-08-17
description: How xAgent grew from a single Agent into a multi-Agent, small-model, multi-user server platform, and where I think Agents may go next.
authors: [xagent]
tags: [ai-agent, multi-agent, small-model, self-hosted, connectors]
image: /img/share/en/xagent-overview.png
---

I started building xAgent in April 2025.

The original idea was straightforward: build a task-oriented Agent that could run work on its own and turn AI into real automation. Looking back, that sentence sounds simple. Most of what I have done over the past year has been filling in everything hidden inside the words “run work on its own.”

The first version used a single Agent. I quickly ran into a problem: once the prompt focused its attention on one kind of work, the Agent could do that work well but handle other tasks terribly. Fix one side and it would forget the other. Ask it to pay attention to everything and it would end up paying proper attention to nothing.

That led me to multiple Agents, each responsible for a different part of the work and able to collaborate with the others. The idea worked, but as soon as they started running together, the next problem became obvious: tokens were too expensive.

{/* truncate */}

I bought a modified RTX 4090 with 48 GB of VRAM and started running open models locally. That took some pressure off the token bill, but exposed another problem: small open models were not smart enough. This was still the Qwen 3.0 era. The gap between local models and the best hosted models was obvious, especially on long tasks. They skipped steps, wandered away from the goal, and ignored instructions in all sorts of ways.

I did not solve this by buying more tokens from top-tier models. It was not because those models were bad. The most practical reason was that I simply did not have the money. Once multiple Agents run continuously, the allowance included with a subscription disappears quickly. Spending more could solve the problem, but I could not afford to keep doing that, and it did not look sustainable for most individuals or small teams either.

Not having the money forced me to think seriously about a question that has shaped xAgent ever since: can a small team with a limited budget use Agents properly without constantly paying for the best models, keeping costs under control while still getting good work done? The model may be less capable, but the system has to keep the task moving. It cannot let the work fall apart halfway through, or allow one wrong step to turn every later step into another mistake.

I spent the next few months testing over and over again: different tasks, different models, different ways of organizing context. Something failed, I changed it, and then I tried again. By August 2025, I had a first working version.

Around that time, my wife had also started using Agents. I realized that if more than one person at home needed this, I might as well make it multi-user and run it on a server. That decision ended up shaping xAgent in a major way. Many things that now look like product positioning came from a very ordinary need: both of us wanted to use it, and I did not want to install and maintain a separate copy on every computer.

Over time, I also realized that my basic understanding of an Agent may be different from that of many other people.

Most people still see an Agent as an assistant. You call it over while you are working, ask it to find information, revise a document, or write some code. When you stop, its work usually stops too. I have always preferred to think of an Agent as a colleague, or as someone reporting to me.

That does not mean it should replace human decisions, and it does not mean I treat it as a person. I mean the working relationship. I give it a goal. It moves the work forward by itself, comes back when it hits a problem, waits for my confirmation when necessary, and returns with the result. I do not want to sit beside it and explain every click and every next step.

Because I see Agents this way, I care about different things. Can a task continue after an interruption? Can the system pull the Agent back when it makes a mistake? Which actions must come back to a person? xAgent still looks like a chat interface, but the task may only be starting when the user finishes that first message. It may need to research, process files, use tools, or wait for an external message before continuing. A timer or another system may start the task instead. None of this needs to stay tied to the user's computer.

Desktop Agents have their advantages. They are close to the user, can operate the local computer conveniently, and work well as assistance for whatever is in front of you. They can also automate work. But when you expect them to run for a long time, many problems that have nothing to do with AI begin to appear. Does the computer stay on overnight? Will it go to sleep? Is there enough disk space? Is it powerful enough? How do you restore it after a failure? How is the work backed up?

That is why I see desktop and server-side Agents as more than the same product installed in two places. They come from different ideas. A desktop Agent follows one person and helps with the work at hand. A server-side Agent has to keep tasks running, serve several people, and give someone a way to maintain it when things go wrong. This was also when I started thinking about turning xAgent into a commercial product.

I added many adaptations and hard-coded guardrails after that. Some of them are not elegant, but they genuinely help small models. It was not until March 2026 that I felt xAgent was barely ready for other people to use. That became the first public version, `0.0.4.beta`.

After releasing it, I spoke with quite a few friends and potential users. They often asked, “How is this different from Codex or OpenClaw? What is your advantage?”

At first, I would talk about security, auditability, multi-user support, and easier team maintenance. Those really are xAgent's advantages, but after enough conversations I realized that most users do not care very much, at least not yet. Their first question is whether it works well and whether it can get the job in front of them done. As long as the bill stays small, the maintenance cost behind the product and the cost of the model rarely decide which product they choose.

Many people currently use AI for a few documents, some research, or occasional information gathering. They do not consume much in a day, and most still pay for it personally. If a company only gives employees a modest allowance for office work, the cost may remain manageable.

But imagine a company where everyone uses AI for more than half of every workday. The bill would look very different. The deeper AI enters daily work, the less this remains a technical department's problem. Every company will eventually have to do the math.

There is another group of companies that must use local compute for compliance, privacy, or data-security reasons. The problem is even clearer there.

Most Agent products are developed and demonstrated with the best available models. A sufficiently capable model can cover up many weaknesses in the surrounding system. Hallucinations, once the most obvious problem, are much less common with today's top models. They are still common with small models, along with failures in instruction following, long-task continuity, and tool use.

I have seen companies buy hardware early only to leave it sitting idle. The demo they watched used a top model, so of course it looked good. In real deployment, cost or compliance forced them to switch to a local model, and the experience changed completely. It could still answer simple questions, but long tasks, information gathering, research, file processing, everyday assistance, and internal-system analysis were out of reach. The machines were there, the Agent was installed, and nobody actually used it for work.

I am not claiming that xAgent has solved all of this. That would not be true. I use Codex while developing xAgent, but most task testing has been done with 27B models from Qwen 3.0 through Qwen 3.6, along with some older versions and variants. Long tasks generally finish. The results can be off, but in actual use I do not think the gap from the leading models is so large that the system becomes unusable. It has reached a point where I can use it for real work.

Once the workflow became more stable, I went back to cutting costs.

I started with prefix caching and kept trimming the prompt. Stable parts of a process became hard orchestration. When the model drifted, the system needed a way to bring it back. Memory could not be a pile of everything the model had ever seen; it needed to be distilled, merged, and brought in only when useful. None of these changes looked dramatic on its own. The result improved one small step at a time.

By `0.0.10.beta`, the base prompt had fallen from about 20K tokens to roughly 5K, while task stability and accuracy were better than before. This is difficult to measure cleanly, and the models themselves have improved at the same time. Smarter models naturally produce better results, so the improvement cannot all be credited to the system. Still, put the same model into two different Agent systems and there can be a very visible difference in whether it finishes a long task.

A multi-user server platform also has to solve the problem of connecting external systems.

On a desktop, each person can bring a personal token and configure an MCP server. xAgent cannot simply copy that model. It runs on a server and serves multiple users. Where should authorization live? What is the model allowed to see? How does an incoming message reach the right person? Those questions led me to build the Connector system, which remains one of the parts of xAgent I am happiest with.

Authorization for the target system is managed on the server. The model uses the permitted capability without ever needing the real credentials. A Connector also does more than expose a few tools. It can receive information proactively. If someone sends a message through WeChat, for example, the Connector can deliver it to a dedicated Agent under that user's account. The user does not need to open xAgent and paste the message into a chat window first.

Some people say this is basic functionality on the desktop. They are not wrong. But once many connected systems can all send information back, the problem is no longer just whether the message arrives. Are messages queued or handled concurrently? What happens when the computer is off? Are messages processed while the desktop client is closed? When it starts again, did anything get lost?

A large part of the Connector work is about answering those questions. I want the Agent to keep running without the user being online at that moment, but I do not want it operating without human management. A person should not need to watch every step, but should know what it is doing and retain control over important actions.

Continuing down this path eventually leads to AI workflow products. Most workflow systems fix the process in advance. That makes execution predictable, but it also creates a development cycle. The person building the workflow and the person using it are often different people. By the time the workflow goes live, the need may already have changed. Every later process change brings another round of development.

xAgent still starts from a Skill. A Skill describes how a kind of work should be done, and the Agent makes a plan for the task in front of it. Parts that are stable can be hard-orchestrated, but the whole task does not have to be drawn as a flowchart that can never change. I want working methods to accumulate without forcing every changed task to start over from scratch.

At `0.0.10.beta`, xAgent feels relatively complete and stable to me. I use it with a 27B model every day. It sends industry-news summaries to me through WeChat, conducts industry research, gathers information from the web, and writes reports. These are no longer tasks prepared for a demo. They are things I genuinely use every day.

The next missing piece is the knowledge base, which I see as xAgent's last major weakness. It is roughly 30 percent complete. The overall architecture and the logic for chunking, indexing, and graph representation are already worked out. What remains is mainly implementation and testing, which should move quickly.

Once the knowledge base is finished, the core architecture of xAgent will be largely settled. I do not plan to keep making large changes. From there, the focus shifts to giving it more “hands and feet”: connecting to servers for automated operations, connecting to phones to operate apps, helping run e-commerce, media, investing, and quantitative workflows, and training models. I see model training as another form of automation too.

While building all of this, I often wonder what Agents will eventually become.

I do not think they can replace human decisions. People decide what is worth doing, choose a direction, and make the final call. Agents fill gaps in our knowledge and carry out much of the concrete work. That is roughly what symbiosis means to me.

The current moment feels a little like early European industrialization, when horse-drawn carriages and steam engines still ran side by side. Many people worry that Agents will replace human work. I think the first thing they will take away is repetitive labor. People can use the time they get back to plan, or to try ideas they could not afford to try before. Something that once took months to validate may now take days. In some cases, the time drops by a factor of twenty or fifty. People still make the decisions, but making them becomes much less expensive.

I have not completely worked out how this lands in practice. One possibility runs against the common expectation: the more capable Agents become, the less people may need to collaborate with one another. One person with several Agents may take over work that used to be spread across several people and several roles. Teams become smaller, each person owns more, and there are fewer reasons for people to pass work back and forth.

Office assistance may reach that point quickly. If an Agent can handle 90 percent of a role, will a company still keep ten people on a team that used to need ten? From the company's point of view, perhaps one or two will be enough. That is not good news for employees, but I think it will be difficult to avoid. People who understand several fields, can make decisions, and know how to lead Agents through work may become unusually valuable.

Business software may follow a similar path. The people building it will not always be programmers. Employees can ask an Agent to create the tools they need because they know better than anyone what their daily work is missing. Today's huge demand for coding may partly mean that software has not developed fast enough to cover countless specific business needs. Once enough of those gaps have been filled, demand for the same kind of system will naturally fall. Building a system may eventually feel like making a spreadsheet today, hardly something worth announcing.

All of that is still mostly about saving money and improving efficiency. I am more interested in whether Agents can create entirely new businesses.

How far Agents go may depend largely on how many new ideas people can come up with. Models will keep getting smarter, but they will not tell us which business is worth building or which problem is worth solving. Work that used to cost too much, serve too small a market, or make no economic sense may now be worth calculating again. Agents can turn an idea into something real more quickly and make experimentation cheaper, but the original idea still has to come from a person.

The picture I can currently imagine is one with smaller companies and far more AI. One person manages a group of Agents. Those Agents create more Agents as the task requires, and the work continues around the clock. People do not participate in every step, but they still decide what the Agents should do, why they should do it, and when they should stop.

xAgent is still a long way from that picture. But when I design it, I really do think of the Agent as a colleague or a direct report, not just an assistant waiting to be called. I want to hand it a piece of work, go do something else, come back later, and see whether the work actually got done.

I am an engineer. This is about as good as my writing gets, so please bear with me.
