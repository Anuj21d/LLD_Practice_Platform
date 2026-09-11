# Research Note — LLD Practice Platform

## 1. Problem I am trying to solve

Low-Level Design questions are common in software engineering interviews. In these questions, the main task is to decide how a system should be divided into classes, interfaces and responsibilities.

The difficult part is that there is usually more than one way to design the same system. For example, while designing a Parking Lot, one person may use different classes or patterns than another person, but both designs can still be reasonable.

I found that having only a reference solution is not always enough for practice. A learner needs a way to first try the problem on their own and then understand what is good or weak in their design.

The idea for the platform is therefore:

```text
Choose a problem
       ↓
Create a design
       ↓
Submit it
       ↓
Get feedback
       ↓
Improve the design
       ↓
Try again
```

---

## 2. Existing platforms and approaches

### Educative

Educative has courses for Low-Level Design and Object-Oriented Design. It covers topics like OOP, SOLID principles, design patterns, UML and different real-world design problems.

I found this useful because the content is structured and gives learners a good starting point for LLD.

The limitation for this idea is that the main focus is on learning the concepts and going through examples. I wanted to explore a workflow where the learner can first create a solution and then get feedback on that particular solution.

### Design Gurus

Design Gurus also has Object-Oriented Design interview preparation. It contains common problems such as Parking Lot, Elevator, ATM, Chess and Splitwise.

It is useful because it gives a method for approaching design questions and has many examples.

The gap I noticed is similar to Educative. There is a lot of useful learning content, but a separate simple practice flow for submitting a personal design and getting feedback could be useful.

### Exercism

Exercism is a coding practice platform. A learner solves exercises and can receive automated or mentor feedback.

The part I found interesting is the practice and feedback cycle. A learner can solve something, get feedback and continue improving.

However, Exercism is mainly focused on coding exercises. LLD has a different problem because the quality of a solution depends heavily on responsibilities, relationships, abstractions and design decisions.

### LeetCode

LeetCode has many community discussions about LLD and system design. There are different solutions for problems such as Parking Lot, Splitwise and other systems.

The main advantage is that there are many different approaches available.

The downside is that the learner has to manually compare their own design with those discussions. The feedback is not part of one simple practice workflow.

---

## 3. Gaps I found

### Feedback is more useful than only a score

For LLD, saying that a solution is 70/100 does not explain much.

Useful feedback should point out things such as:

- which responsibilities are handled well
- which requirements are missing
- where classes have too many responsibilities
- whether abstractions are useful
- whether the design can be extended
- what should be improved next

### There can be multiple good solutions

I don't want the platform to treat one reference implementation as the only correct answer.

For example, two designs can use different class structures and still satisfy the same requirements.

Because of this, the evaluation should look at the quality of the design and the reasoning behind it.

### Practice should be repeatable

A learner should be able to submit a design, read the feedback and try the same problem again.

Keeping previous attempts also makes it possible to see whether the design is improving.

---

## 4. Product direction

The product I am building is a small LLD practice platform.

The first version focuses on one complete flow instead of trying to support every type of learning feature.

The main features are:

1. Select an LLD problem.
2. Read the requirements and context.
3. Write a proposed design.
4. Submit the design.
5. Evaluate the submission.
6. Show useful feedback.
7. Save the attempt.
8. Allow the learner to try again.

For evaluation, I decided to use two approaches.

The first is a deterministic evaluator. It checks some known requirements in a consistent way.

The second is an AI evaluator. It is used mainly for explaining the design, identifying strengths and weaknesses, and suggesting the next improvement.

I chose this combination because relying completely on an LLM for scoring can make the result less consistent. At the same time, deterministic checks alone are not very good at explaining design trade-offs.

---

## 5. Product goal

The main goal is to make LLD practice more iterative.

Instead of:

```text
Read solution → move to next problem
```

the platform encourages:

```text
Create design
     ↓
Get feedback
     ↓
Understand mistakes
     ↓
Improve
     ↓
Submit again
```

The MVP is intentionally limited to LLD practice and feedback. It does not try to become a complete course platform or a general system-design tool.
