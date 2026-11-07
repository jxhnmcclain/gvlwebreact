import assert from 'node:assert/strict';
import test from 'node:test';
import { deriveDiagnostic, getQuestionFlow, questions, serializeDiagnostic } from '../lib/academyDiagnostic.ts';

const common = { role: 'design', goal: 'tool', startingPoint: 'repeated', tools: 'chat', testing: 'one', blocker: 'build', time: '45' };

test('shows beginner questions and skips project capability when nothing has been built', () => {
  const flow = getQuestionFlow({ ...common, built: 'nothing' });
  assert.equal(flow.length, 10);
  assert.ok(flow.includes('beginnerInput'));
  assert.ok(flow.includes('beginnerMaterial'));
  assert.ok(!flow.includes('capability'));
  assert.ok(!flow.includes('prototypeData'));
});

test('asks the right technical questions for a prototype or published app', () => {
  assert.ok(getQuestionFlow({ ...common, built: 'prototype' }).includes('prototypeAccess'));
  assert.ok(getQuestionFlow({ ...common, built: 'published' }).includes('publishedErrors'));
});

test('recommends a level from the artifact and working flow', () => {
  assert.equal(deriveDiagnostic({ ...common, built: 'nothing' }).level, 1);
  assert.equal(deriveDiagnostic({ ...common, built: 'artifact', capability: 'answer' }).level, 2);
  assert.equal(deriveDiagnostic({ ...common, built: 'published', capability: 'answer' }).level, 2);
  assert.equal(deriveDiagnostic({ ...common, built: 'published', capability: 'flow' }).level, 3);
  assert.equal(deriveDiagnostic({ ...common, built: 'prototype', capability: 'flow', prototypeAccess: 'public' }).level, 3);
});

test('every goal and level has a concrete exercise and saves within the current detail limit', () => {
  for (const goal of ['tool', 'automation', 'app', 'explore']) {
    for (const built of ['nothing', 'artifact', 'published']) {
      const answers = { ...common, goal, built, capability: 'flow', beginnerInput: 'rough', beginnerMaterial: 'text', prototypeData: 'file', prototypeAccess: 'preview', publishedUsers: 'no', publishedErrors: 'logs' };
      const { exercise } = deriveDiagnostic(answers);
      assert.equal(exercise.steps.length, 3);
      assert.ok(exercise.proof.length > 15);
      assert.ok(serializeDiagnostic(answers).length < 1000);
    }
  }
});

test('all options have a distinct value and a visible label', () => {
  for (const question of Object.values(questions)) {
    assert.ok(question.title.length > 8);
    assert.equal(new Set(question.choices.map(choice => choice.value)).size, question.choices.length);
    assert.ok(question.choices.every(choice => choice.label.length > 1));
  }
});
