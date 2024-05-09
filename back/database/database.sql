create table users(
	id serial primary key,
	name VARCHAR(40),
	email TEXT
)

insert into users(name, email) values
('John Doe', 'joDoe@gmail.com'),
('Danils','danils@gmail.com')

