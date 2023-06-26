select
  topics.id as topic_id,
  topics.name as topic_name,
  COUNT(courses.id) as course_count
from
  courses
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
where
  courses.id in (
    select
      courses.id as course_id
    from
      courses
      join course_topics ctq on ctq.course_id = courses.id
    where
      courses.category = 1
      AND ctq.topic_id in (499)
    group by
      courses.id
    having
      COUNT(ctq.topic_id) = 1
  )
group by
  topics.id;



create or replace view courses_avg_rating as
select courses.id, AVG(course_review.rating) as avg_rating
from courses
left join course_review on course_review.course_id = courses.id
group by courses.id
order by courses.id;

create or replace view course_category_sub_category_avg_rating as
select courses.id, category.name as category_name, sub_category.name as sub_category_name, courses_avg_rating.avg_rating
from courses
left join category on courses.category = category.id
left join sub_category on courses.sub_category = sub_category.id
left join courses_avg_rating on courses.id = courses_avg_rating.id;

create or replace view category_wise_courses_count_on_different_rating_range as
select category.id, category.name as category_name, COUNT(case when courses_avg_rating.avg_rating > 3 then 1 end) as rating_3_up, COUNT(case when courses_avg_rating.avg_rating > 3.5 then 1 end) as rating_3_half_up, COUNT(case when courses_avg_rating.avg_rating > 4 then 1 end) as rating_4_up, COUNT(case when courses_avg_rating.avg_rating > 4.5 then 1 end) as rating_4_half_up
from courses
left join category on courses.category = category.id
left join courses_avg_rating on courses.id = courses_avg_rating.id
group by category.id;

create or replace view category_wise_courses_count_on_different_topics as
select category.id as category_id, category.name as category_name, topics.id as topic_id, topics.name as topic_name, COUNT(courses.id) course_count
from courses
left join category on courses.category = category.id
left join course_topics on courses.id = course_topics.course_id
left join topics on course_topics.topic_id = topics.id
group by category.id, topics.id
order by category.id;

create or replace view category_wise_courses_count_on_different_sub_categories as
select category.id as category_id, category.name as category_name, sub_category.id as sub_category_id, sub_category.name as sub_category_name, COUNT(courses.id) course_count
from courses
left join category on courses.category = category.id
left join sub_category on courses.sub_category = sub_category.id
group by category.id, sub_category.id
order by category.id;

