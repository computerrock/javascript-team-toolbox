# Code review

The benefits of code reviews rise and fall with the value of the code review feedback. If done correctly, code reviews can help to ensure a high-quality code base. However, if teams are not aware of and do not follow code review best practices, developers may experience several code review pitfalls. In the worst case, reviewing code can slow your team down.
In this section are given some of the best practices of how to do a code review:

## Areas covered by the code review

* look at the change itself and how it fits into the codebase,
* cover the correctness of the code, test coverage, functionality changes, and confirm that they follow the coding guides and best practices,
* point out obvious improvements, such as hard to understand code, unclear names, commented out code, untested code, or unhandled edge cases,
* note when too many changes are crammed into one review, and suggest keeping code changes single-purposed or breaking the change into more focused parts,
* look at the change in the context of the larger system, as well as check that changes are easy to maintain,
* note maintainability observations, such as complex logic that could be simplified, improving test structure, removing duplicates, and other possible improvements.

## Tone of the review

* give respectful and constructive feedback
* ask open-ended questions instead of making strong or opinionated statements,
* offer alternatives and possible workarounds that might work better for the situation without insisting those solutions are the best or only way to proceed,
* do know that the person writing the code spent a lot of time and effort on this change,
* be open to suggested changes, (receiving unexpected comments or feedback might make you tense and defensive. Try to prepare yourself mentally and work on your ability to be open to suggestions and different viewpoints. Always start with the assumption that the reviewer had the best intention).

## Approving vs requesting changes

* don’t approve changes while there are open-ended questions,
* make it clear which questions or comments are non-blocking or unimportant, marking them distinctively,
* always explain why you rejected a change, explain your rejection in a polite, constructive and friendly way it will help the code author to learn,
* be explicit when approving a change – e.g. adding a thumbs up comment like “looks good!”,
* leave as many comments and questions as are needed,
* when the conversation gets into a long back-and-forth, try to switch to talking to the author in-person instead of  burning more time using the code review tool, (you can save a lot of time, misunderstandings, and hard feelings this way. The fact that there are many comments on the code indicates that there is likely some misunderstanding on either side. These kinds of misunderstandings are easier identified and resolved by talking things through),
* reject changes only when absolutely necessary.

## Nitpicks

Nitpicks are unimportant comments, where the code could be merged without even addressing these. These could be things like variable declarations being in alphabetical order, unit tests following a certain structure, or brackets being on the same line.

* make it clear when changes are unimportant,
* mark comments like these distinctively, adding the “nit:” prefix to them, but not use them too often because that could take the attention away from the more important parts of the review.

## Other best practices

* use the same quality bar and approach for everyone, regardless of their job title, level or when they joined the company,
* pay additional attention to making the first few reviews for new joiners a great experience (know the fact that the recent joiner might not be aware of all the coding guidelines and might be unfamiliar with parts of the code),
* review fewer than 400 lines of code (LOC) at a time,
* ake your time. Inspection rates should under 500 LOC per hour,
* do not review for more than 60 minutes at a time.
