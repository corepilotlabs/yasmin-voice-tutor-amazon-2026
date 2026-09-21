export const LESSONS = {
  fractions: {
    id: 'fractions',
    subject: 'Math',
    title: 'Fractions that make sense',
    icon: '½',
    objective: 'Compare simple fractions and connect equivalent fractions.',
    intro: "A fraction tells us how many equal parts we have. Imagine one pizza cut into four equal slices. If you eat one slice, that is one quarter: one out of four equal parts.",
    reteach: [
      "Think about the same-sized pizza. One half means two equal big pieces. One quarter means four smaller equal pieces. If you take one piece, the half-piece is bigger.",
      "Let's use a number line. One quarter is 0.25 and one half is 0.5. The point farther to the right is larger, so one half is larger.",
      "Picture two identical chocolate bars. Split one into two equal pieces and the other into four. One piece from the first bar is visibly bigger than one piece from the second."
    ],
    questions: [
      {
        prompt: 'Which is larger: one half or one quarter?',
        answers: ['one half', 'half', '1/2', 'نصف', 'النصف'],
        hint: 'Imagine the same pizza: would one of 2 equal slices or one of 4 equal slices be bigger?',
        success: 'Exactly. One half is larger than one quarter because splitting the same whole into fewer equal parts makes each part bigger.'
      },
      {
        prompt: 'Now, is two quarters equal to one half?',
        answers: ['yes', 'yeah', 'correct', 'true', 'ايوه', 'أيوه', 'نعم', 'اه', 'آه'],
        hint: 'Two quarters means 2 out of 4 equal parts. Can you simplify 2/4?',
        success: 'Yes. Two quarters simplifies to one half. You connected equivalent fractions.'
      }
    ],
    reflection: 'Tell me in your own words: why is one half larger than one quarter?',
    reflectionRubric: {
      minRequired: 2,
      required: [
        {
          id: 'comparison',
          label: 'identifies one half as the larger fraction',
          phrases: ['one half is bigger', 'one half is larger', 'half is bigger', 'half is larger', 'النصف اكبر', 'نصف اكبر']
        },
        {
          id: 'same-whole',
          label: 'keeps the comparison on the same whole',
          phrases: ['same whole', 'same pizza', 'same size', 'identical', 'نفس الكل', 'نفس الحجم']
        },
        {
          id: 'fewer-parts',
          label: 'connects fewer equal parts to larger pieces',
          phrases: ['fewer equal parts', 'fewer parts', 'split into fewer', 'two equal pieces', 'pieces are bigger', 'larger pieces', 'اجزاء اقل', 'قطع اكبر']
        }
      ],
      contradictions: ['one quarter is bigger', 'quarter is bigger', 'one quarter is larger', 'quarter is larger']
    }
  },
  foodchain: {
    id: 'foodchain',
    subject: 'Science',
    title: 'How energy moves in a food chain',
    icon: '🌿',
    objective: 'Identify producers and explain the direction of energy flow.',
    intro: 'A food chain shows how energy moves from one living thing to another. Plants make their own food using sunlight, so they are called producers. Animals get energy by eating plants or other animals.',
    reteach: [
      'Start with the Sun. A plant captures light energy. A rabbit eats the plant, then a fox may eat the rabbit. The energy moves Sun → plant → rabbit → fox.',
      'A producer is like the kitchen of the ecosystem: it makes food instead of eating another living thing to get it.',
      'If an organism can make food from sunlight, it starts the living part of many food chains. That is why green plants are producers.'
    ],
    questions: [
      {
        prompt: 'In a grass → rabbit → fox food chain, which organism is the producer?',
        answers: ['grass', 'the grass', 'عشب', 'العشب'],
        hint: 'Which one can make its own food using sunlight?',
        success: 'Correct. Grass is the producer because it makes its own food using sunlight.'
      },
      {
        prompt: 'Does energy move from the fox back to the grass in this food chain?',
        answers: ['no', 'nope', 'false', 'لا'],
        hint: 'Follow the arrows: grass gives energy to the rabbit, and the rabbit gives energy to the fox.',
        success: 'Right. In this simple chain, energy moves from grass to rabbit to fox, not backward.'
      }
    ],
    reflection: 'Explain the food chain in one sentence using the word energy.',
    reflectionRubric: {
      minRequired: 2,
      required: [
        {
          id: 'energy',
          label: 'mentions energy',
          phrases: ['energy', 'طاقه']
        },
        {
          id: 'direction',
          label: 'describes forward energy flow',
          phrases: ['grass to rabbit', 'rabbit to fox', 'plant to rabbit', 'plant to animal', 'moves from', 'flows from', 'ينتقل من']
        },
        {
          id: 'producer',
          label: 'recognizes the plant or grass as the producer/start',
          phrases: ['producer', 'grass starts', 'plant starts', 'grass is first', 'plant is first', 'المنتج', 'العشب', 'النبات']
        }
      ],
      contradictions: ['fox to grass', 'energy moves backward', 'energy goes backward']
    }
  },
  mainidea: {
    id: 'mainidea',
    subject: 'English',
    title: 'Find the main idea',
    icon: '📚',
    objective: 'Separate a passage’s main idea from supporting details.',
    intro: 'The main idea is the most important message a paragraph is mostly about. Supporting details give examples, facts, or explanations that help prove that main idea.',
    reteach: [
      'Ask yourself: if I could keep only one sentence to explain what the whole paragraph is about, what would it say?',
      'Details are smaller pieces. The main idea is the umbrella that covers most of those details.',
      'Look for what several details have in common. That shared message is often the main idea.'
    ],
    questions: [
      {
        prompt: 'A paragraph says: Bees pollinate flowers, help plants make seeds, and support many crops. What is the main idea: bees are important to plants, or bees are yellow and black?',
        answers: ['bees are important to plants', 'important to plants', 'first', 'the first one', 'الأول', 'الاول'],
        hint: 'Which choice is supported by all three details: pollination, seeds, and crops?',
        success: 'Yes. “Bees are important to plants” covers all the supporting details.'
      },
      {
        prompt: 'If one sentence gives a single example, is that usually the main idea or a supporting detail?',
        answers: ['supporting detail', 'detail', 'a detail', 'تفصيل', 'تفاصيل'],
        hint: 'A main idea covers several details; one example normally supports the bigger message.',
        success: 'Exactly. A single example is usually a supporting detail.'
      }
    ],
    reflection: 'What question can you ask yourself to find the main idea of a paragraph?',
    reflectionRubric: {
      minRequired: 2,
      required: [
        {
          id: 'whole-text',
          label: 'focuses on the whole paragraph',
          phrases: ['whole paragraph', 'paragraph is about', 'whole text', 'mostly about', 'الفقرة كلها', 'الفقرة تتكلم عن']
        },
        {
          id: 'important-message',
          label: 'looks for the most important message',
          phrases: ['main message', 'most important', 'main idea', 'important message', 'الفكره الرئيسيه', 'اهم فكره']
        },
        {
          id: 'details',
          label: 'connects supporting details to the shared idea',
          phrases: ['details have in common', 'details support', 'supporting details', 'what the details share', 'التفاصيل', 'ما تشترك فيه التفاصيل']
        }
      ]
    }
  }
};

const UNCERTAINTY = ['i dont know', "i don't know", 'not sure', 'dont know', "don't know", 'مش عارف', 'مش عارفة', 'معرفش', 'مش متأكد', 'مش متأكدة'];
const CONFUSION = ['dont understand', "don't understand", 'i do not understand', 'confused', 'مش فاهم', 'مش فاهمة', 'مش فهمت', 'مش واضحة', 'مش واضح'];
const HINT = ['hint', 'give me a hint', 'help me', 'تلميح', 'ساعدني', 'مساعدة'];

function normalizeArabic(text) {
  return text
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[ًٌٍَُِّْـ]/g, '');
}

export function normalize(text = '') {
  return normalizeArabic(text.toLowerCase())
    .replace(/[“”"'`.,!?؟:;()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasPhrase(input, list) {
  return list.some((item) => normalize(input).includes(normalize(item)));
}

function answerMatches(input, answers) {
  const n = normalize(input);
  if (!n) return false;
  const tokens = new Set(n.split(' ').filter(Boolean));
  return answers.some((answer) => {
    const a = normalize(answer);
    if (!a) return false;
    if (n === a) return true;
    if (a.includes(' ')) return n.includes(a);
    return tokens.has(a);
  });
}

export function evaluateReflection(input, rubric) {
  const n = normalize(input);
  const required = Array.isArray(rubric?.required) ? rubric.required : [];
  const contradictions = Array.isArray(rubric?.contradictions) ? rubric.contradictions : [];
  const contradiction = contradictions.find((phrase) => n.includes(normalize(phrase))) || null;

  const matched = required.filter((criterion) =>
    (criterion.phrases || []).some((phrase) => n.includes(normalize(phrase)))
  );
  const missing = required.filter((criterion) => !matched.includes(criterion));
  const minRequired = Math.max(1, Number(rubric?.minRequired) || required.length || 1);

  return {
    passed: !contradiction && matched.length >= minRequired,
    contradiction,
    matched: matched.map(({ id, label }) => ({ id, label })),
    missing: missing.map(({ id, label }) => ({ id, label })),
    score: required.length ? Math.round((matched.length / required.length) * 100) : 0
  };
}

export class TutorAgent {
  constructor(lessonId = 'fractions') {
    this.lesson = LESSONS[lessonId] || LESSONS.fractions;
    this.reset();
  }

  reset() {
    this.phase = 'idle';
    this.questionIndex = 0;
    this.attempts = 0;
    this.reteachIndex = 0;
    this.mastery = 20;
    this.evidence = [];
    this.lastDecision = 'Waiting to start';
    this.strategy = 'Explain → check understanding';
    this.turn = 0;
  }

  selectLesson(lessonId) {
    this.lesson = LESSONS[lessonId] || this.lesson;
    this.reset();
    return this.snapshot();
  }

  start() {
    this.phase = 'question';
    this.turn += 1;
    this.lastDecision = 'Start with a concise concept explanation, then ask a diagnostic question.';
    this.strategy = 'Concrete example';
    return {
      text: `${this.lesson.intro} ${this.lesson.questions[0].prompt}`,
      kind: 'explain',
      ...this.snapshot()
    };
  }

  handle(rawInput) {
    const input = String(rawInput || '').trim();
    this.turn += 1;

    if (!input) {
      this.lastDecision = 'No usable learner input. Ask again instead of guessing.';
      return { text: 'I did not catch an answer. Try saying it again, or type it below.', kind: 'retry', ...this.snapshot() };
    }

    if (hasPhrase(input, HINT)) return this.giveHint();
    if (hasPhrase(input, CONFUSION)) return this.reteach('confusion');
    if (hasPhrase(input, UNCERTAINTY)) return this.reteach('uncertainty');

    if (this.phase === 'reflection') return this.handleReflection(input);
    if (this.phase === 'complete') {
      this.lastDecision = 'Lesson is complete; invite a new lesson rather than inventing more assessment.';
      return { text: 'You completed this learning loop. Choose another lesson when you are ready.', kind: 'complete', ...this.snapshot() };
    }
    if (this.phase === 'idle') return this.start();

    const q = this.lesson.questions[this.questionIndex];
    if (answerMatches(input, q.answers)) return this.correct(q, input);
    return this.incorrect(q, input);
  }

  giveHint() {
    if (this.phase !== 'question') {
      this.lastDecision = 'Hint requested outside a scored question. Give process guidance, not an answer.';
      this.strategy = 'Metacognitive prompt';
      return { text: 'Try explaining what you already know first. I will use that to decide the next hint.', kind: 'hint', ...this.snapshot() };
    }
    const q = this.lesson.questions[this.questionIndex];
    this.lastDecision = 'Learner explicitly requested help. Give a hint without revealing the answer.';
    this.strategy = 'Hint, not answer';
    return { text: q.hint, kind: 'hint', ...this.snapshot() };
  }

  reteach(reason) {
    const explanation = this.lesson.reteach[this.reteachIndex % this.lesson.reteach.length];
    this.reteachIndex += 1;
    this.attempts += 1;
    this.mastery = Math.max(10, this.mastery - 3);
    this.lastDecision = `Detected ${reason}. Switch representation instead of repeating the same explanation.`;
    this.strategy = ['Visual analogy', 'Number-line / sequence', 'Everyday example'][this.reteachIndex % 3];
    const q = this.lesson.questions[this.questionIndex] || this.lesson.questions[0];
    return { text: `${explanation} Let's try again. ${q.prompt}`, kind: 'reteach', ...this.snapshot() };
  }

  incorrect(q, input) {
    this.attempts += 1;
    this.mastery = Math.max(10, this.mastery - 2);
    this.evidence.push({ type: 'needs-support', label: `Attempt ${this.attempts}: ${input.slice(0, 48)}` });
    if (this.attempts % 2 === 1) {
      this.lastDecision = 'Answer does not match expected concept. Offer a targeted hint before reteaching.';
      this.strategy = 'Targeted hint';
      return { text: `Not quite yet. ${q.hint}`, kind: 'hint', ...this.snapshot() };
    }
    return this.reteach('repeated mismatch');
  }

  correct(q, input) {
    this.evidence.push({ type: 'mastery', label: `Correct: ${input.slice(0, 48)}` });
    this.mastery = Math.min(100, this.mastery + (this.attempts ? 25 : 35));
    this.attempts = 0;
    this.questionIndex += 1;
    if (this.questionIndex < this.lesson.questions.length) {
      this.phase = 'question';
      this.lastDecision = 'Concept evidence is positive. Increase difficulty slightly with a transfer question.';
      this.strategy = 'Transfer check';
      return { text: `${q.success} ${this.lesson.questions[this.questionIndex].prompt}`, kind: 'correct', ...this.snapshot() };
    }
    this.phase = 'reflection';
    this.lastDecision = 'Two concept checks passed. Ask for a learner explanation before marking the loop complete.';
    this.strategy = 'Explain in your own words';
    return { text: `${q.success} ${this.lesson.reflection}`, kind: 'reflection', ...this.snapshot() };
  }

  handleReflection(input) {
    const n = normalize(input);
    if (hasPhrase(n, UNCERTAINTY) || hasPhrase(n, CONFUSION) || n.length < 8 || /^(yes|no|okay|ok|تمام|ايوه|نعم)$/.test(n)) {
      this.lastDecision = 'Reflection lacks enough concept evidence. Do not falsely mark mastery; ask for one concrete idea.';
      this.strategy = 'Evidence-first reflection';
      this.mastery = Math.max(55, this.mastery - 5);
      return {
        text: `I need one idea from you, not just “okay.” ${this.lesson.reflection}`,
        kind: 'retry',
        ...this.snapshot()
      };
    }

    const evaluation = evaluateReflection(input, this.lesson.reflectionRubric);

    if (!evaluation.passed) {
      const matchedLabels = evaluation.matched.map((item) => item.label);
      const missingLabels = evaluation.missing.map((item) => item.label);
      this.evidence.push({
        type: 'partial',
        label: `Reflection rubric ${evaluation.score}%: ${matchedLabels.join('; ') || 'no required concept evidence yet'}`
      });
      this.mastery = Math.max(55, this.mastery - 3);
      this.lastDecision = evaluation.contradiction
        ? `Reflection contains a contradiction (“${evaluation.contradiction}”). Keep the loop open and repair the misconception.`
        : `Reflection is partial (${evaluation.score}% rubric coverage). Keep the loop open and ask for the missing concept evidence.`;
      this.strategy = evaluation.contradiction ? 'Misconception repair' : 'Target missing evidence';
      const missing = missingLabels[0] || 'one more piece of concept evidence';
      return {
        text: `You gave me part of the idea. I still need you to show that you can ${missing}. ${this.lesson.reflection}`,
        kind: 'retry',
        reflectionEvaluation: evaluation,
        ...this.snapshot()
      };
    }

    this.evidence.push({
      type: 'reflection',
      label: `Reflection rubric ${evaluation.score}%: ${evaluation.matched.map((item) => item.label).join('; ')}`
    });
    this.mastery = Math.max(this.mastery, Math.min(100, 90 + Math.round(evaluation.score / 20)));
    this.phase = 'complete';
    this.lastDecision = `Reflection passed the concept rubric (${evaluation.score}% coverage) after the diagnostic checks. Mark this learning loop complete.`;
    this.strategy = 'Complete with rubric evidence';
    return {
      text: 'That explanation gives me enough concept evidence that you understood the idea. Great work. I can now use this mastery evidence when I plan what comes next.',
      kind: 'complete',
      reflectionEvaluation: evaluation,
      ...this.snapshot()
    };
  }

  snapshot() {
    return {
      phase: this.phase,
      mastery: this.mastery,
      questionIndex: this.questionIndex,
      lastDecision: this.lastDecision,
      strategy: this.strategy,
      evidence: [...this.evidence],
      lesson: this.lesson,
      turn: this.turn
    };
  }
}
