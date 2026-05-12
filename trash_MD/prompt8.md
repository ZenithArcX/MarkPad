The performance logs expose a CRITICAL architecture problem.

Typing is still causing excessive rerenders.

This proves render isolation is NOT working correctly.

Current logs:

- Block rendered 17 times
- BlockEditor rendered 11 times

This should NEVER happen during lightweight typing.

====================================================
CORE PROBLEM
====================================================

The editor still has:
- global state churn
- parent rerenders
- render propagation
- unnecessary reconciliation
- typing pipeline coupling

Typing is NOT fully isolated from rendering.

The result:
- sticky typing
- blocked input
- cursor lag
- UI stutter

====================================================
MOST IMPORTANT REQUIREMENT
====================================================

While typing inside ONE block:

ONLY that local textarea should update.

NOT:
- BlockEditor
- toolbar
- sibling blocks
- document container
- persistence layer
- markdown renderer

Typing must become almost entirely local.

====================================================
I NEED A COMPLETE PERFORMANCE FIX
====================================================

Investigate EXACTLY why:
- BlockEditor rerenders during typing
- active block rerenders excessively
- autosave may trigger rerenders
- Zustand subscriptions propagate updates
- memoization is failing

====================================================
REQUIRED DEBUGGING
====================================================

Trace:
- every state update source
- every rerender source
- every prop identity change
- every subscription trigger

Find:
- unstable callbacks
- recreated arrays
- recreated objects
- selector invalidation
- parent state coupling

====================================================
CRITICAL FIXES REQUIRED
====================================================

1. FULL TYPING ISOLATION
----------------------------------------------------

Typing must stay entirely inside:
- local refs
- local state
- uncontrolled textarea buffer

React global state must NOT update per keystroke.

====================================================
2. BLOCKEDITOR RERENDER ELIMINATION
====================================================

BlockEditor must NOT rerender during normal typing.

Fix:
- unstable props
- array recreation
- selector invalidation
- parent subscriptions

====================================================
3. ZUSTAND SELECTOR OPTIMIZATION
====================================================

Use:
- shallow selectors
- isolated subscriptions
- granular block selectors

Avoid:
- subscribing entire editor tree
- subscribing to full blocks array
- object recreation

====================================================
4. AUTOSAVE DECOUPLING
====================================================

Autosave must NEVER trigger React rerenders.

Persistence should run:
- asynchronously
- outside render pipeline
- outside typing loop

IndexedDB writes must NEVER affect typing responsiveness.

====================================================
5. MARKDOWN RENDER DEFER
====================================================

Markdown compilation must:
- NOT run during rapid typing
- NOT block main thread
- NOT rerender parent tree

Use:
- requestIdleCallback
- debounce
- background scheduling

====================================================
6. MEMOIZATION AUDIT
====================================================

Audit:
- React.memo usage
- useCallback stability
- useMemo stability
- prop identity stability

Prevent:
- unnecessary prop changes
- function recreation
- object recreation

====================================================
7. TEXTAREA STABILITY
====================================================

Textarea DOM node must remain stable.

Avoid:
- remounting
- controlled rerender loops
- selection resets
- cursor jumps

The textarea should behave like native memory.

====================================================
8. PERFORMANCE TARGETS
====================================================

TARGET:
- BlockEditor rerenders: near zero during typing
- active block rerenders: minimal
- sibling block rerenders: zero
- typing latency: invisible

Typing should feel:
- instant
- native
- frictionless

====================================================
9. REQUIRED OUTPUT
====================================================

Provide:
1. Exact root cause analysis
2. Why rerenders happen
3. Which subscriptions are unstable
4. Which props change unnecessarily
5. Exact code-level fixes
6. Updated architecture strategy
7. Render flow after fixes
8. Expected rerender counts after optimization

====================================================
IMPORTANT
====================================================

DO NOT add features.
DO NOT polish UI.

Fix ONLY:
- typing smoothness
- render isolation
- rerender storms
- editor responsiveness

This is now a PERFORMANCE ENGINEERING problem, not a feature problem.