export interface BitriseApp {
  repo_owner: string;
  slug: string;
  title: string;
  avatar_url: string | null;
}

export interface EnvVars {
  is_expand: boolean;
  mapped_to: string;
  value: string;
}

export interface BitriseBuild {
  slug: string;
  branch: string;
  build_number: string;
  finished_at: string;
  original_build_params: {
    branch: string;
    workflow_id: string;
    environments: EnvVars[];
  };
  status: number;
  started_on_worker_at: string;
  triggered_at: string;
  triggered_by: string | null;
  triggered_workflow: string;
}

export interface BitriseLog {
  log_chunks: {
    chunk: string;
    position: number;
  }[];
}

export interface BitriseWebhook {
  events: string[];
  headers: { [k: string]: string };
  registered_by_addon: boolean;
  slug: string;
  url: string;
}
