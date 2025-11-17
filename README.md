# voyage-tasks

Your project's `readme` is as important to success as your code. For
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point -
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

---

## 🚀 Local Environment Setup (Supabase & React Native)

To run the application against a local, isolated instance of the **Supabase backend**, follow these steps.

### Prerequisites

You need the following tools installed and running **globally** on your system:

- **Supabase CLI:** Required for managing the local backend services.
  ```bash
  npm install -g supabase-cli
  ```
- **Docker:** Required to run the local Supabase services.
  - **Installation:** Download and install **Docker Desktop** for your operating system (Mac, Windows, Linux) from the official Docker website. Ensure the Docker service is running before proceeding.

### Step 1: Start the Local Supabase Instance

1.  Navigate to the root directory of the project.
2.  Start the local Supabase services. This may take a minute and requires Docker to be running.
    ```bash
    supabase start
    ```
    ⚠️ **IMPORTANT:** Note the **`anon key`** and **`API URL`** that are outputted by this command. Keep these handy for the next step.

### Step 2: Configure Local Environment Variables

The application needs environment variables to connect to the local Supabase instance. **Do not track the actual values in Git.**

1.  **Copy the Example File:** Create your local environment file by copying the example provided in this repository:
    ```bash
    cp .env.example .env.local .env.production
    ```
2.  **Populate Secrets:** Open the newly created **`.env.local`** file and replace the placeholder values with the output from `supabase start`:

    ```
    # .env.local
    # --- LOCAL SUPABASE INSTANCE KEYS ---
    SUPABASE_URL="[http://127.0.0.1:54321](http://127.0.0.1:54321)" # The API URL from supabase start
    SUPABASE_ANON_KEY="<paste_the_anon_key_from_supabase_start>"
    ```

and **`.env.production`**

### Step 3: Run Migrations

If your project includes database changes (migrations), sync them to your local database to ensure your schema is up to date:

```bash
supabase db reset

```

### Step 4: Start the Application

Now you can start the application from the root of the project. This will run the api and the front-end.

```bash
pnpm run dev
```

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Daniel Afriyie: [GitHub](https://github.com/dk-afriyie) / [LinkedIn](https://linkedin.com/in/danielkafriyie)
- Samuel Igwe: [GitHub](https://github.com/frugalcodes) / [LinkedIn](https://uk.linkedin.com/in/samuel-igwe-031152226)
- Nati Gebregorgis: [GitHub](https://github.com/TEMESGEN-G25)/ [LinkedIn](https://linkedin.com/in/natigebregorgis)
- Fouad Tabbara: [GitHub](https://github.com/fmtabbara) / [LinkedIn](https://linkedin.com/in/fouad-tabbara-1b754461)
- Peter Tasca: [GitHub](https://github.com/tascapeter514) / [LinkedIn](https://linkedin.com/in/peter-tasca)
- Ruth Igwe-Oruta: [GitHub](https://github.com/Xondacc) / [LinkedIn](https://linkedin.com/in/ruthigwe-oruta)
- Avy: [GitHub](https://github.com/a10823888w) / [LinkedIn](https://linkedin.com/in/liaccountname)

  ...

- Teammate name #n: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)
