---
author: AI大紧
createdAt: '2026-04-28 13:23'
---

# GitHub Copilot 转向按量计费

> 原文：https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
> 发布时间：2026 年 4 月 27 日 | 译者：AI大紧

**TL;DR：GitHub 宣布所有 Copilot 套餐将于 2026 年 6 月 1 日起转向按量计费。**

从 6 月 1 日起，你的 Copilot 用量将消耗 GitHub AI Credits（AI 积分）。

原有的 premium requests（高级请求）计费方式将被替换，每个 Copilot 套餐将包含每月一定额度的 GitHub AI Credits，付费套餐还可以按需购买额外用量。用量按 token 消耗计算，包括输入、输出和缓存 token，以每个模型公开的 API 费率为准。

这一变化使 Copilot 定价与实际用量更加匹配，是构建可持续、可靠的 Copilot 业务的重要一步。

为帮助用户提前准备，GitHub 将于 5 月初推出账单预览功能，让用户和管理员在 6 月 1 日正式切换前就能看到预计费用。用户登录 github.com 后可在「账单概览」页面查看。

---

## 为什么要做这个改变

Copilot 已经不是一年前那个产品了。

它从一个编辑器内的辅助工具，进化成了一个能够运行长时间、多步骤编码会话的 Agent 平台，支持最新模型，可以跨整个仓库持续迭代。Agent 模式正在成为默认用法，而它带来的计算和推理需求远高于以往。

现在，一个简单的问答和一个长达数小时的自主编码会话，对用户来说花费相同。GitHub 一直在背后承担着不断攀升的推理成本，但现有的 premium requests 模型已难以为继。

按量计费解决了这个问题——定价与实际用量更匹配，有助于维持长期服务稳定性，也减少了对重度用户设置限制的需要。

---

## 具体变化

**从 6 月 1 日起，premium request units（PRUs）将被 GitHub AI Credits 取代。**

Credits 根据 token 用量消耗，包括输入、输出和缓存 token，按各模型公开 API 费率计算。

几个重要细节：

- **套餐月费不变**：Copilot Pro 仍为 $10/月，Pro+ 仍为 $39/月，Business 仍为 $19/用户/月，Enterprise 仍为 $39/用户/月
- **代码补全和 Next Edit 建议**在所有套餐中继续包含，不消耗 AI Credits
- **降级体验将不再提供**：现有模式下，用完 PRUs 的用户可降级到低成本模型继续使用；新模式下，用量将由可用 credits 和管理员预算控制来约束
- **Copilot code review** 除消耗 AI Credits 外，还会消耗 GitHub Actions 分钟数，按与其他 Actions 工作流相同的每分钟费率计费

---

## 对个人用户的影响

Copilot Pro 和 Pro+ 月订阅将包含与订阅价格对等的每月 AI Credits：

- **Copilot Pro**：$10/月，包含 $10 的月度 AI Credits
- **Copilot Pro+**：$39/月，包含 $39 的月度 AI Credits

**月付 Pro/Pro+ 用户**将于 2026 年 6 月 1 日自动迁移到按量计费。

**年付 Pro/Pro+ 用户**将继续沿用现有的 premium requests 计费方式，直至套餐到期。注意：仅针对年付用户，模型倍率将于 6 月 1 日上调（详见官方表格）。到期后将自动转为 Copilot Free，可选择升级为月付套餐。也可以在年付到期前转换为月付，GitHub 将按剩余价值提供折算 credits。

---

## 对企业和团队用户的影响

Copilot Business 和 Enterprise 的月度席位价格不变：

- **Copilot Business**：$19/用户/月，包含 $19 的月度 AI Credits
- **Copilot Enterprise**：$39/用户/月，包含 $39 的月度 AI Credits

为支持过渡，现有 Business 和 Enterprise 客户将在 6、7、8 月自动获得促销额度：

- **Copilot Business**：每月 $30 的 AI Credits
- **Copilot Enterprise**：每月 $70 的 AI Credits

GitHub 还引入了**组织级 credits 共享池**，解决了过去各用户未用完的额度相互隔离、造成浪费的问题。现在额度可以在组织内共享使用。

管理员还将获得新的预算控制工具，可在企业、成本中心和用户级别设置预算上限。共享池耗尽后，可选择按公开费率继续使用，或直接封顶。

---

## 总结

**套餐价格不变。你对花费有完全的掌控权**，有工具追踪用量，需要时可以购买更多 AI Credits。

如有疑问，可查看官方文档：[个人用户版](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) | [企业/团队版](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)，以及 [FAQ 社区讨论](https://github.com/orgs/community/discussions/192948)。
