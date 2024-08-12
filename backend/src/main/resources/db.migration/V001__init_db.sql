create table customer
(
	customer_code uuid default gen_random_uuid() primary key,
	customer_name varchar not null unique,
	customer_inn varchar not null unique,
	customer_kpp varchar not null,
	customer_legal_address varchar not null,
	customer_postal_address varchar not null,
	customer_email varchar not null,
	is_organization boolean not null,
	is_person boolean not null
);

create table lot
(
    lot_id uuid default gen_random_uuid() primary key,
	lot_name varchar not null unique,
	lot_description varchar,
	price int not null,
	currency_code varchar not null,
	nds_rate varchar not null,
	place_delivery varchar not null,
	date_delivery timestamp not null,
	customer_code uuid not null,
	foreign key (customer_code) references customer (customer_code) on delete cascade,
	check (currency_code in ('RUB', 'USD', 'EUR')),
    check (nds_rate in ('Без НДС', '18%', '20%'))
);