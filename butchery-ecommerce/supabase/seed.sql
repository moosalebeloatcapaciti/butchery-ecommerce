-- Optional: seeds the `products` table with the same catalog defined in
-- lib/products.ts, so you can manage pricing from Supabase instead of code.
-- Run schema.sql first, then this file.

insert into products (id, slug, name, category, category_label, description, price, unit, image, featured) values
('beef-burger-patties','beef-burger-patties','Beef Burger Patties','beef','Beef','Hand-shaped raw beef patties, seasoned and ready for the fire.',155,'kg','/images/beef-products/beef-burger-patties.jpg',true),
('beef-mince-regular','beef-mince-regular','Beef Mince (Regular)','beef','Beef','Everyday beef mince, ground fresh.',155,'kg','/images/beef-products/beef-burger-patties.jpg',false),
('beef-mince-lean','beef-mince-lean','Beef Mince (Lean)','beef','Beef','Lean cut beef mince with less fat.',195,'kg','/images/beef-products/beef-burger-patties.jpg',false),
('rump-steak','rump-steak','Rump Steak','beef','Beef','Braai-ready rump, cut thick for the fire.',285,'kg','/images/beef-products/beef-burger-patties.jpg',true),
('sirloin-steak','sirloin-steak','Sirloin Steak','beef','Beef','Tender sirloin, trimmed to preference.',325,'kg','/images/beef-products/beef-burger-patties.jpg',false),
('t-bone-steak','t-bone-steak','T-Bone Steak','beef','Beef','The classic. Strip and fillet either side of the bone.',305,'kg','/images/beef-products/beef-burger-patties.jpg',false),
('oxtail','oxtail','Oxtail','beef','Beef','Slow-cook oxtail, chopped and ready.',245,'kg','/images/beef-products/beef-burger-patties.jpg',false),

('pork-braai-chops','pork-braai-chops','Pork Braai Chops','pork','Pork','Thick-cut pork chops, marinade-ready.',120,'kg','/images/pork-products/pork-braai-chops.jpg',true),
('pork-stew-meat','pork-stew-meat','Pork Stew Meat (Cubed)','pork','Pork','Cubed pork stew meat, cut fresh.',100,'kg','/images/pork-products/pork-stew-meat.jpg',false),
('pork-packs-assorted','pork-packs-assorted','Pork Packs (Assorted Cuts)','pork','Pork','A mixed pack of assorted pork cuts.',115,'kg','/images/pork-products/pork-packs-assorted.jpg',false),
('pork-trotters','pork-trotters','Pork Trotters','pork','Pork','Cleaned pork trotters.',55,'kg','/images/pork-products/pork-trotters.jpg',false),
('pork-back-bones','pork-back-bones','Pork Back Bones','pork','Pork','Meaty pork back bones.',65,'kg','/images/pork-products/pork-back-bones.jpg',false),
('pork-smoked-bones','pork-smoked-bones','Pork Smoked Bones','pork','Pork','In-house smoked pork bones.',70,'kg','/images/pork-products/pork-smoked-bones.jpg',false),

('biltong','biltong','Traditional Biltong','processed','Biltong & Droëwors','Air-dried, spice-cured biltong.',22,'100g','/images/other-processed-products/biltong.png',true),
('boerewors-coiled','boerewors-coiled','Fresh Boerewors (Coiled)','processed','Wors & Sausage','Coiled boerewors, made fresh in-house.',105,'kg','/images/other-processed-products/boerewors-coiled.jpg',true),
('chakalaka-wors','chakalaka-wors','Chakalaka Wors (Coiled)','processed','Wors & Sausage','Boerewors with a fiery chakalaka twist.',115,'kg','/images/other-processed-products/chakalaka-wors.jpg',false),
('chakalaka-burgers','chakalaka-burgers','Chakalaka Burgers','processed','Burgers','Raw beef patties with chakalaka spice.',165,'kg','/images/other-processed-products/chakalaka-burgers.jpg',false),
('chakalaka-mince','chakalaka-mince','Chakalaka Mince','processed','Mince','Pre-spiced chakalaka mince.',160,'kg','/images/other-processed-products/chakalaka-mince.jpg',false),
('french-polony','french-polony','French Polony','processed','Cold Meats','Sliced or whole French polony.',70,'kg','/images/other-processed-products/french-polony.jpg',false),
('penny-polony','penny-polony','Penny Polony','processed','Cold Meats','Classic penny polony.',55,'kg','/images/other-processed-products/penny-polony.jpg',false),
('red-viennas','red-viennas','Red Viennas','processed','Cold Meats','Classic red viennas.',75,'kg','/images/other-processed-products/red-viennas.jpg',false),
('sandwich-ham','sandwich-ham','Sandwich Ham (Sliced)','processed','Cold Meats','Sliced sandwich ham.',150,'kg','/images/other-processed-products/sandwich-ham.jpg',false),

('house-braai-spice','house-braai-spice','House Braai Spice Blend','spice','Spices & Marinades','Our signature steak & chops spice blend.',32,'100g','/images/spice-products/house-braai-spice.jpg',true),
('five-spice-pack','five-spice-pack','Signature 5-Spice Pack','spice','Spices & Marinades','All five house spice blends in one pack.',150,'pack','/images/spice-products/five-spices-shot.jpg',false),
('peri-peri-marinade','peri-peri-marinade','Peri-Peri Marinade','spice','Spices & Marinades','Bottled peri-peri marinade.',75,'250ml','/images/spice-products/five-spices-shot.jpg',false),
('bbq-marinade','bbq-marinade','BBQ Marinade','spice','Spices & Marinades','Smoky-sweet BBQ marinade.',75,'250ml','/images/spice-products/five-spices-shot.jpg',false),

('braai-box','braai-box','The Braai Box','combo','Combo Deals','Rump steak, boerewors, chicken wings and house spice.',650,'pack','/images/business-past-menus/past-specials-promos1.jpg',true),
('family-feast','family-feast','Family Feast Pack','combo','Combo Deals','Whole chicken, beef mince and pork braai chops.',750,'pack','/images/business-past-menus/past-specials-promos2.jpg',false)
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image;
