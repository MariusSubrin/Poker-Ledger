# AI Usage Documentation

## 1. Overview

Poker Ledger is developed with the assistance of Artificial Intelligence tools.

AI is used as a development assistant to help design, implement, test, debug and document the application.

The main objective is to improve development efficiency while maintaining code quality, security, maintainability and a clear understanding of the implemented features.

AI-generated code is not automatically considered correct. All important implementations must be reviewed and validated before being accepted into the project.

## 2. AI Tools Used

### Google Gemini through Antigravity

Google Gemini, accessed through the Antigravity IDE, is the primary AI development assistant for this project.

It is used for:

- Software architecture and technical planning.
- Generating and modifying source code.
- Implementing frontend components and application pages.
- Designing database schemas and SQL migrations.
- Implementing Supabase authentication and authorization.
- Writing Row Level Security policies.
- Generating automated tests.
- Debugging errors and suggesting corrections.
- Improving code structure and maintainability.
- Generating technical documentation.

Antigravity provides the development environment in which Gemini can interact with project files, execute commands and assist with implementation.

### ChatGPT

ChatGPT is used as an additional assistance tool during the planning and documentation stages.

Its responsibilities include:

- Defining the project requirements.
- Identifying functional and technical constraints.
- Designing business rules.
- Reviewing the proposed database architecture.
- Identifying potential security issues.
- Structuring development instructions.
- Preparing documentation.
- Helping evaluate technical decisions.

ChatGPT and Gemini may be used together, but their suggestions must be checked against the actual project implementation.

## 3. AI-Assisted Development Workflow

The development process follows an incremental workflow.

### Step 1 — Requirements and architecture

AI assistance is used to transform the initial application idea into a structured specification.

This includes:

- Defining the application's features.
- Identifying user roles and permissions.
- Establishing business rules.
- Selecting the technical stack.
- Designing the database structure.
- Identifying potential security risks.

### Step 2 — Project implementation

Gemini assists with the implementation of each development phase directly in the IDE.

It can:

- Create files and folders.
- Generate components.
- Implement business logic.
- Configure dependencies.
- Write SQL migrations.
- Connect the frontend to Supabase.
- Refactor existing code.

Changes are implemented incrementally rather than generating the entire application in a single step.

### Step 3 — Testing and validation

AI assists in generating test cases and identifying potential problems.

Testing covers:

- Unit tests.
- Component tests.
- Integration tests.
- End-to-end tests.
- Database constraints.
- Authentication and authorization.
- Row Level Security policies.

AI-generated tests must actually be executed. A suggested or generated test is not proof that a feature works.

### Step 4 — Debugging and improvements

When an issue occurs, AI can analyze error messages, inspect relevant source files and suggest possible fixes.

Corrections must be evaluated to ensure that they do not introduce regressions or weaken existing security rules.

### Step 5 — Documentation

AI assists in maintaining project documentation, including:

- README.md.
- AI_USAGE.md.
- Database documentation.
- Installation instructions.
- Development procedures.
- Technical explanations.

## 4. Human Supervision and Responsibility

AI tools are assistants, not autonomous authorities.

The project owner remains responsible for:

- Defining the intended behavior of the application.
- Reviewing important architectural decisions.
- Approving significant changes.
- Validating application behavior.
- Checking security-sensitive implementations.
- Deciding which generated code is accepted.
- Managing production credentials and deployment.

Particular attention must be paid to authentication, invitation validation, database access control and Row Level Security.

No security-critical implementation should be accepted solely because an AI tool claims that it is secure.

## 5. Limitations of AI-Generated Code

AI-generated code may contain:

- Incorrect assumptions.
- Outdated library APIs.
- Incomplete error handling.
- Incorrect SQL constraints.
- Insecure authorization policies.
- Missing edge cases.
- Incorrect calculations.
- Dependencies that are unnecessary or poorly maintained.

For this reason, generated code must be checked against official documentation and tested in the actual development environment.

When technical uncertainty exists, the implementation should be verified using reliable documentation rather than relying exclusively on AI-generated explanations.

## 6. Security and Privacy Considerations

AI tools must not be provided with sensitive production information.

The following information must never be shared unnecessarily with AI tools or committed to the repository:

- Supabase service role keys.
- Private API keys.
- Database passwords.
- Authentication secrets.
- Production access tokens.
- Private user credentials.
- Real player data when anonymized examples are sufficient.

Environment variables and secrets must be managed separately from source code.

The project must use `.env.example` for documenting required configuration variables without including real credentials.

AI-generated database policies must be tested using multiple accounts with different roles and permissions.

## 7. AI Usage Transparency

AI assistance is used in multiple parts of the project, including architecture, implementation, debugging, testing and documentation.

The use of AI does not remove the need for human review or technical validation.

The final implementation is evaluated based on its actual behavior, code quality, security and compliance with the project requirements, not on the fact that code was generated by an AI tool.

## 8. Development Principles

The following principles guide AI-assisted development:

1. Incremental implementation instead of generating the entire project at once.
2. Human validation at important development milestones.
3. Automated testing whenever possible.
4. Security by design, especially for database access.
5. No unverified claims about successful implementation.
6. Clear documentation of technical decisions.
7. No production secrets in source code or AI prompts.
8. Preference for maintainable and understandable code over unnecessary complexity.

## 9. Conclusion

Artificial Intelligence is an important part of the Poker Ledger development workflow.

It helps accelerate development, explore technical solutions and maintain documentation.

However, the project remains subject to human supervision, testing and validation at every critical stage.

The objective is to use AI as a productivity tool while ensuring that Poker Ledger remains secure, reliable, understandable and maintainable.
