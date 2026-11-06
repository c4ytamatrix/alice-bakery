create table if not exists public.alice_backups (
    user_id uuid primary key references auth.users (id) on delete cascade,
    payload jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
);

alter table public.alice_backups enable row level security;

drop policy if exists "Users manage their own Alice backup" on public.alice_backups;
create policy "Users manage their own Alice backup"
    on public.alice_backups
    for all
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

grant select, insert, update, delete on public.alice_backups to authenticated;
