-- types

create type course_level_enum as enum ('ALL_LEVELS', 'BEGINNER', 'INTERMEDIATE', 'EXPERT');
create type course_access_enum as enum ('PAID', 'FREE');
create type language_enum AS enum ('English', 'Hindi', 'Sanskrit', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Russian', 'Other');
create type course_section_contents_type_enum as enum ('VIDEO', 'DOCUMENT', 'QUIZ');
create type carts_status_enum as enum ('ACTIVE', 'PENDING', 'CHECKED_OUT', 'CANCELED', 'FAILED', 'ABANDONED');
create type payment_sessions_status_enum as enum ('PENDING', 'COMPLETED', 'FAILED', 'CANCELED');
create type payments_status_enum as enum ('PENDING', 'COMPLETED', 'FAILED', 'CANCELED');

-- tables

create table
  public.user_profiles (
    user_id uuid not null,
    username text not null,
    avatar text null,
    first_name text null,
    last_name text null,
    account_type text not null default 'default'::text,
    constraint user_profiles_pkey primary key (user_id),
    constraint user_profiles_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create table
  public.categories (
    id bigint generated by default as identity not null,
    name text not null,
    description text null,
    created_at timestamp with time zone null default now(),
    constraint categories_pkey primary key (id),
    constraint categories_name_key unique (name)
  ) tablespace pg_default;

create table
  public.sub_categories (
    id bigint generated by default as identity not null,
    name text not null,
    description text null,
    category_id bigint not null,
    created_at timestamp with time zone null default now(),
    constraint sub_categories_pkey primary key (id),
    constraint sub_categories_name_and_categories_id_composite_key unique (name, category_id),
    constraint sub_categories_categories_id_fkey foreign key (category_id) references categories (id) on delete cascade
  ) tablespace pg_default;

create table
  public.topics (
    id bigint generated by default as identity not null,
    name text not null,
    description text null,
    created_at timestamp with time zone null default now(),
    constraint topics_pkey primary key (id),
    constraint topics_name_key unique (name)
  ) tablespace pg_default;

create table
  public.courses (
    id bigint generated by default as identity not null,
    image text null,
    title text not null,
    short_description text null,
    category bigint not null,
    sub_category bigint not null,
    level course_level_enum default 'ALL_LEVELS' not null,
    language language_enum not null,
    is_paid course_access_enum default 'PAID' not null,
    meta_data json null,
    avg_rating decimal(10,2) default 0 not null,
    review_count bigint default 0 not null,
    enrollments_count bigint default 0 not null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint courses_pkey primary key (id),
    constraint courses_categories_fkey foreign key (categories) references categories (id) on delete restrict,
    constraint courses_sub_categories_fkey foreign key (sub_categories) references sub_categories (id) on delete restrict
  ) tablespace pg_default;

create table
  public.prices (
    id bigint generated by default as identity not null,
    course_id bigint not null,
    amount decimal(10,2),
    currency varchar(3) default 'USD',
    is_promotional boolean default false,
    start_date date,
    end_date date,
    constraint prices_pkey primary key (id),
    constraint prices_course_id_fkey foreign key (course_id) references courses (id) on delete cascade
  ) tablespace pg_default;

create table
  public.tags (
    id bigint generated by default as identity not null,
    name text not null,
    constraint tags_pkey primary key (id),
    constraint tags_name_key unique (name)
  ) tablespace pg_default;

create table
  public.course_tags (
    tag_id bigint not null,
    course_id bigint not null,
    constraint course_tags_tag_id_fkey foreign key (tag_id) references tags (id) on delete cascade,
    constraint course_tags_course_id_fkey foreign key (course_id) references courses (id) on delete cascade
  ) tablespace pg_default;

create table
  public.course_topics (
    topic_id bigint not null,
    course_id bigint not null,
    constraint course_topics_topic_id_fkey foreign key (topic_id) references topics (id) on delete cascade,
    constraint course_topics_course_id_fkey foreign key (course_id) references courses (id) on delete cascade
  ) tablespace pg_default;

create table
  public.course_instructors (
    course_id bigint not null,
    user_id uuid not null,
    constraint course_instructors_pkey primary key (course_id, user_id),
    constraint course_instructors_course_id_fkey foreign key (course_id) references courses (id) on delete cascade,
    constraint course_instructors_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create table
  public.enrollments (
    course_id bigint not null,
    user_id uuid not null,
    created_at timestamp with time zone null default now(),
    constraint enrollments_pkey primary key (course_id, user_id),
    constraint enrollments_course_id_fkey foreign key (course_id) references courses (id) on delete cascade,
    constraint enrollments_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create table
  public.course_reviews (
    id bigint generated by default as identity not null,
    rating real not null,
    user_id uuid not null,
    course_id bigint not null,
    body text not null,
    created_at timestamp with time zone null default now(),
    constraint course_reviews_pkey primary key (id),
    constraint course_reviews_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
    constraint course_reviews_course_id_fkey foreign key (course_id) references courses (id) on delete cascade,
    constraint course_reviews_user_id_and_course_id_composite_key unique (user_id, course_id)
  ) tablespace pg_default;

  create table
    public.course_sections (
      id bigint generated by default as identity not null,
      course_id bigint not null,
      title text not null,
      order_index integer not null,
      created_at timestamp with time zone null default now(),
      constraint course_sections_pkey primary key (id),
      constraint course_sections_course_id_fkey foreign key (course_id) references courses (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.course_section_contents (
      id bigint generated by default as identity not null,
      section_id bigint not null,
      order_index integer not null,
      title text not null,
      type course_section_contents_type_enum not null,
      url text null,
      resources json null,
      created_at timestamp with time zone null default now(),
      constraint course_section_contents_pkey primary key (id),
      constraint course_section_contents_section_id_fkey foreign key (section_id) references course_sections (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.carts (
      id bigint generated by default as identity not null,
      user_id uuid not null,
      type carts_status_enum not null,
      constraint carts_pkey primary key (id),
      constraint carts_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
    ) tablespace pg_default;
  
  create table
    public.cart_courses (
      cart_id bigint not null,
      course_id bigint not null,
      constraint cart_courses_pkey primary key (cart_id, course_id),
      constraint cart_courses_cart_id_fkey foreign key (cart_id) references public.carts (id) on delete cascade,
      constraint cart_courses_course_id_fkey foreign key (course_id) references public.courses (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.payment_sessions (
      id bigint generated by default as identity not null,
      user_id uuid not null,
      cart_id bigint not null,
      status payment_sessions_status_enum not null,
      created_at timestamp with time zone null default now(),
      updated_at timestamp with time zone null default now(),
      constraint payment_sessions_pkey primary key (id),
      constraint payment_sessions_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
      constraint payment_sessions_cart_id_fkey foreign key (cart_id) references public.carts (id) on delete cascade
    ) tablespace pg_default;

  create table 
    public.payments (
      id bigint generated by default as identity not null,
      payment_sessions_id bigint not null,
      amount decimal(10,2) not null,
      status payments_status_enum not null,
      created_at timestamp with time zone null default now(),
      updated_at timestamp with time zone null default now(),
      constraint payments_pkey primary key (id),
      constraint payments_payment_sessions_id_fkey foreign key (payment_sessions_id) references public.payment_sessions (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.wishlists (
      user_id uuid not null,
      course_id bigint not null,
      constraint wishlists_pkey primary key (user_id, course_id),
      constraint wishlists_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
      constraint wishlists_course_id_fkey foreign key (course_id) references public.courses (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.course_lists (
      id bigint generated by default as identity not null,
      name varchar(60) not null,
      description varchar(200) not null,
      user_id uuid not null,
      constraint course_lists_pkey primary key (id),
      constraint course_lists_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
    ) tablespace pg_default;

  create table
    public.course_list_courses (
      list_id bigint not null,
      course_id bigint not null,
      constraint course_list_courses_pkey primary key (list_id, course_id),
      constraint course_list_courses_list_id_fkey foreign key (list_id) references public.course_lists (id) on delete cascade,
      constraint course_list_courses_course_id_fkey foreign key (course_id) references public.courses (id) on delete cascade
    ) tablespace pg_default;

-- indexes

create index idx_search_courses on courses using gin(to_tsvector('english', title || ' ' || short_description));

-- views

create or replace view courses_sm as
select courses.id, courses.title, courses.short_description, categories.name as category, sub_categories.name as sub_category, courses.avg_rating, courses.language, courses.is_paid, courses.level, json_agg(topics.name) as topic
from
  courses
  join categories on categories.id = courses.category
  join sub_categories on sub_categories.id = courses.sub_category
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
group by
  courses.id, categories.name, sub_categories.name;

create or replace view courses_md as
select courses.id, courses.image, courses.title, courses.short_description, courses.enrollments_count, courses.created_at, categories.name as category, sub_categories.name as sub_category, courses.avg_rating, courses.is_paid, courses.level, prices.amount as amount,  courses.language, courses.review_count, json_agg(distinct tags.name) as tag, json_agg(distinct topics.name) as topic, json_agg(distinct user_profiles.username) as instructor
from
  courses
  join categories on categories.id = courses.category
  join sub_categories on sub_categories.id = courses.sub_category
  left join prices on prices.course_id = courses.id
  left join course_tags on course_tags.course_id = courses.id
  left join tags on tags.id = course_tags.tag_id
  join course_instructors on course_instructors.course_id = courses.id
  join user_profiles on course_instructors.user_id = user_profiles.user_id
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
group by
  courses.id, categories.id, sub_categories.id, prices.id;

create or replace view
  courses_lg as
select
  courses.id,
  courses.image,
  courses.title,
  courses.short_description,
  courses.enrollments_count,
  courses.created_at,
  categories.name as category,
  sub_categories.name as sub_category,
  courses.avg_rating,
  courses.is_paid,
  courses.level,
  prices.amount as amount,
  courses.meta_data,
  courses.language,
  courses.review_count,
  json_agg(distinct tags.name) as tag,
  json_agg(distinct topics.name) as topic,
  json_agg(
    distinct json_build_object(
      'user_id',
      user_profiles.user_id,
      'username',
      user_profiles.username
    )::jsonb
  ) as instructor
from
  courses
  join categories on categories.id = courses.category
  join sub_categories on sub_categories.id = courses.sub_category
  left join prices on prices.course_id = courses.id
  left join course_tags on course_tags.course_id = courses.id
  left join tags on tags.id = course_tags.tag_id
  join course_instructors on course_instructors.course_id = courses.id
  join user_profiles on course_instructors.user_id = user_profiles.user_id
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
group by
  courses.id,
  categories.id,
  sub_categories.id,
  prices.id;

create or replace view topic_main_and_sub_categories as
select topics.name, json_agg(distinct categories.name) as categories, json_agg(distinct sub_categories.name) as sub_categories
from
  topics
  left join course_topics on course_topics.topic_id = topics.id
  join courses on courses.id = course_topics.course_id
  join categories on categories.id = courses.category
  join sub_categories on sub_categories.id = courses.sub_category
group by
  topics.name;

create or replace view sub_categories_topics as
select sub_categories.name, topics.name as topic, count(distinct courses.id) as course_count
from 
  sub_categories
  left join courses on sub_categories.id = courses.sub_category
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
group by
  sub_categories.name, topics.name;



-- function

create or replace function update_updated_at()
returns trigger as
$$
begin
  NEW.updated_at = NOW();
  return NEW;
end;
$$ language plpgsql;

create or replace function update_average_rating()
returns trigger as 
$$
declare avg_ratingx decimal(10, 2);
declare review_countx bigint;
begin
    select AVG(rating), COUNT(id) into avg_ratingx, review_countx
    from course_reviews
    where course_id = NEW.course_id;
    
    update courses
    set avg_rating = avg_ratingx, review_count = review_countx
    where id = NEW.course_id;

    return NEW;

end;
$$ language plpgsql;

create or replace function update_enrollments_count()
returns trigger as
$$
declare enroll_count bigint;
begin
  select COUNT(user_id) into enroll_count
  from enrollments
  where course_id = NEW.course_id;

  update courses
  set enrollments_count = enroll_count
  where id = NEW.course_id;

  return NEW;
end;
$$ language plpgsql;

create or replace function public.create_user(
    user_id uuid,
    username text,
    email text,
    password text,
    avatar text,
    first_name text,
    last_name text,
    account_type text
) returns void as $$
  declare
  encrypted_pw text;
begin
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  insert into auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, confirmation_token, last_sign_in_at, email_change_token_new, email_change, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '', '', '', '2023-04-22 13:10:31.458239+00', '', '', '{"provider":"email","providers":["email"]}', '{}', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00');
  
  insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values
    (user_id, user_id, user_id, format('{"sub":"%s","email":"%s","email_verified": false,"phone_verified": false}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');

  insert into public.user_profiles (user_id, username, avatar, first_name, last_name, account_type) VALUES (user_id, username, avatar, first_name, last_name, account_type);
end;
$$ language plpgsql;

create or replace function get_text_search_filters(
  q text,
  topics text[],
  levels course_level_enum[],
  rating numeric,
  languages language_enum[],
  price course_access_enum[]
) returns json as
$$
declare
  response json;
begin
  select json_build_object (
    'total', 
    (
      select row_to_json(t)
      from (
        select
          COUNT(distinct id) as total_count
        from 
          courses_sm sm
        where
          to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (languages is null or language in (select unnest(languages)))
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        
      ) t
    ),
    'ratings',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when avg_rating >= 3 then id end) as rating_3_up, 
        COUNT(distinct case when avg_rating >= 3.5 then id end) as rating_3_half_up, 
        COUNT(distinct case when avg_rating >= 4 then id end) as rating_4_up, 
        COUNT(distinct case when avg_rating >= 4.5 then id end) as rating_4_half_up
      from 
        courses_sm sm
      where
        to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
        AND (levels is null or level in (select unnest(levels)))
        AND (languages is null or language in (select unnest(languages)))
        AND (price is null or is_paid in (select unnest(price)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'paid',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when is_paid = 'PAID' then id end) as paid, 
        COUNT(distinct case when is_paid = 'FREE' then id end) as free
      from 
        courses_sm sm
      where
        to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
        AND (levels is null or level in (select unnest(levels)))
        AND (rating is null or avg_rating >= rating)
        AND (languages is null or language in (select unnest(languages)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'level',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when level = 'ALL_LEVELS' then id end) as all_levels, 
        COUNT(distinct case when level = 'BEGINNER' then id end) as beginner, 
        COUNT(distinct case when level = 'INTERMEDIATE' then id end) as intermediate, 
        COUNT(distinct case when level = 'EXPERT' then id end) as expert
      from 
        courses_sm sm
      where
        to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
        AND (rating is null or avg_rating >= rating)
        AND (languages is null or language in (select unnest(languages)))
        AND (price is null or is_paid in (select unnest(price)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'topics',
    (
      select json_agg(row_to_json(t))
      from (
        select
          json_array_elements_text(topic) as topic_name,
          count(distinct id) as topic_count
        from 
          courses_sm sm
        where
          to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (languages is null or language in (select unnest(languages)))
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        group by
          topic_name
        order by topic_count desc
        limit 20
      ) t
    ),
    'languages',
    (
      select json_agg(row_to_json(t))
      from (
        select
          language as language_name,
          count(distinct id) as language_count
        from 
          courses_sm sm
        where
          to_tsvector('english', title || ' ' || short_description) @@ to_tsquery('english', q)
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        group by
          language
        order by language_count desc
        limit 20
      ) t
    ) 
    
  ) into response;

  return response;
end;
$$
language plpgsql;

create or replace function get_categories_filters(
  categories text[],
  sub_categories text[],
  topics text[],
  levels course_level_enum[],
  rating numeric,
  languages language_enum[],
  price course_access_enum[]
) returns json as
$$
declare
  response json;
begin

  select json_build_object (
    'total', 
    (
      select row_to_json(t)
      from (
        select
          COUNT(distinct id) as total_count
        from 
          courses_sm sm
        where
          (categories is null or category in (SELECT unnest(categories)))
          AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (languages is null or language in (select unnest(languages)))
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'ratings',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when avg_rating >= 3 then id end) as rating_3_up, 
        COUNT(distinct case when avg_rating >= 3.5 then id end) as rating_3_half_up, 
        COUNT(distinct case when avg_rating >= 4 then id end) as rating_4_up, 
        COUNT(distinct case when avg_rating >= 4.5 then id end) as rating_4_half_up
      from 
        courses_sm sm
      where
        (categories is null or category in (SELECT unnest(categories)))
        AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
        AND (levels is null or level in (select unnest(levels)))
        AND (languages is null or language in (select unnest(languages)))
        AND (price is null or is_paid in (select unnest(price)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'paid',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when is_paid = 'PAID' then id end) as paid, 
        COUNT(distinct case when is_paid = 'FREE' then id end) as free
      from 
        courses_sm sm
      where
        (categories is null or category in (SELECT unnest(categories)))
        AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
        AND (levels is null or level in (select unnest(levels)))
        AND (rating is null or avg_rating >= rating)
        AND (languages is null or language in (select unnest(languages)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'level',
    (
      select row_to_json(t)
      from (select
        COUNT(distinct case when level = 'ALL_LEVELS' then id end) as all_levels, 
        COUNT(distinct case when level = 'BEGINNER' then id end) as beginner, 
        COUNT(distinct case when level = 'INTERMEDIATE' then id end) as intermediate, 
        COUNT(distinct case when level = 'EXPERT' then id end) as expert
      from 
        courses_sm sm
      where
        (categories is null or category in (SELECT unnest(categories)))
        AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
        AND (rating is null or avg_rating >= rating)
        AND (languages is null or language in (select unnest(languages)))
        AND (price is null or is_paid in (select unnest(price)))
        AND (topics is null or topic::jsonb ?& topics)
      ) t
    ),
    'topics',
    (
      select json_agg(row_to_json(t))
      from (
        select
          json_array_elements_text(topic) as topic_name,
          count(distinct id) as topic_count
        from 
          courses_sm sm
        where
          (categories is null or category in (SELECT unnest(categories)))
          AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (languages is null or language in (select unnest(languages)))
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        group by
          topic_name
        order by topic_count desc
        limit 20
      ) t
    ),
    'languages',
    (
      select json_agg(row_to_json(t))
      from (
        select
          language as language_name,
          count(distinct id) as language_count
        from 
          courses_sm sm
        where
          (categories is null or category in (SELECT unnest(categories)))
          AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        group by
          language
        order by language_count desc
        limit 20
      ) t
    ),
    'sub_categories',
    (
       select json_agg(row_to_json(t))
      from (
        select
          sub_categories as sub_categories_name,
          count(distinct id) as sub_categories_count
        from 
          courses_sm sm
        where
          (categories is null or category in (SELECT unnest(categories)))
          AND (levels is null or level in (select unnest(levels)))
          AND (rating is null or avg_rating >= rating)
          AND (price is null or is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
        group by
          sub_categories
        order by sub_categories_count desc
        limit 20
      ) t
    )
    
  ) into response;

  return response;
end;
$$
language plpgsql;

create or replace function get_courses_list(
  q text,
  categories text[],
  sub_categories text[],
  topics text[],
  levels course_level_enum[],
  rating numeric,
  languages language_enum[],
  price course_access_enum[],
  sort text,
  page_size integer,
  p integer
) returns table (
  id bigint,
  image text,
  title text,
  short_description text,
  enrollments_count bigint,
  instructors json,
  tags json,
  is_paid course_access_enum,
  avg_rating decimal(10,2),
  review_count bigint,
  level course_level_enum,
  amount decimal(10,2)
) as
$$
declare
  response json;
begin

  if sort = 'mostpop' then
      return query select c.id, c.image, c.title, c.short_description, c.enrollments_count, c.instructor as instructors, c.tag as tags, c.is_paid, c.avg_rating, c.review_count, c.level, c.amount
      from
        courses_md c
      where
          (q is null or to_tsvector('english', c.title || ' ' || c.short_description) @@ to_tsquery('english', q))
          AND (categories is null or c.category in (SELECT unnest(categories)))
          AND (sub_categories is null or c.sub_category in (select unnest(sub_categories)))
          AND (levels is null or c.level in (select unnest(levels)))
          AND (rating is null or c.avg_rating >= rating)
          AND (languages is null or c.language in (select unnest(languages)))
          AND (price is null or c.is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
      order by
        c.enrollments_count desc,
        c.id
      limit page_size
      offset page_size * p;
  elseif sort = 'new' then
      return query select c.id, c.image, c.title, c.short_description, c.enrollments_count, c.instructor as instructors, c.tag as tags, c.is_paid, c.avg_rating, c.review_count, c.level, c.amount
      from
        courses_md c
      where
          (q is null or to_tsvector('english', c.title || ' ' || c.short_description) @@ to_tsquery('english', q))
          AND (categories is null or c.category in (SELECT unnest(categories)))
          AND (sub_categories is null or c.sub_category in (select unnest(sub_categories)))
          AND (levels is null or c.level in (select unnest(levels)))
          AND (rating is null or c.avg_rating >= rating)
          AND (languages is null or c.language in (select unnest(languages)))
          AND (price is null or c.is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
      order by
        c.created_at desc,
        c.id
      limit page_size
      offset page_size * p;
  elseif sort = 'high' then
      return query select c.id, c.image, c.title, c.short_description, c.enrollments_count, c.instructor as instructors, c.tag as tags, c.is_paid, c.avg_rating, c.review_count, c.level, c.amount
      from
        courses_md c
      where
          (q is null or to_tsvector('english', c.title || ' ' || c.short_description) @@ to_tsquery('english', q))
          AND (categories is null or c.category in (SELECT unnest(categories)))
          AND (sub_categories is null or c.sub_category in (select unnest(sub_categories)))
          AND (levels is null or c.level in (select unnest(levels)))
          AND (rating is null or c.avg_rating >= rating)
          AND (languages is null or c.language in (select unnest(languages)))
          AND (price is null or c.is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
      order by
        c.avg_rating desc,
        c.id
      limit page_size
      offset page_size * p;
  else
     return query select c.id, c.image, c.title, c.short_description, c.enrollments_count, c.instructor as instructors, c.tag as tags, c.is_paid, c.avg_rating, c.review_count, c.level, c.amount
      from
        courses_md c
      where
          (q is null or to_tsvector('english', c.title || ' ' || c.short_description) @@ to_tsquery('english', q))
          AND (categories is null or c.category in (SELECT unnest(categories)))
          AND (sub_categories is null or c.sub_category in (select unnest(sub_categories)))
          AND (levels is null or c.level in (select unnest(levels)))
          AND (rating is null or c.avg_rating >= rating)
          AND (languages is null or c.language in (select unnest(languages)))
          AND (price is null or c.is_paid in (select unnest(price)))
          AND (topics is null or topic::jsonb ?& topics)
      order by
        c.id
      limit page_size
      offset page_size * p;
  end if;  
end;
$$
language plpgsql;

-- triggers

create trigger update_average_rating_trigger
after insert on course_reviews
for each row
execute procedure update_average_rating();

create trigger update_enrollments_count_trigger
after insert on enrollments
for each row
execute procedure update_enrollments_count();

create trigger update_updated_at_courses_trigger
before update on courses
for each row
execute procedure update_updated_at();

create trigger update_updated_at_payment_sessions_trigger
before update on payment_sessions
for each row
execute procedure update_updated_at();

create trigger update_updated_at_payments_trigger
before update on payments
for each row
execute procedure update_updated_at();