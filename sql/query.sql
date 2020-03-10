-- View
SELECT * FROM [Customer]
SELECT * FROM [Product]
SELECT * FROM [Order]
SELECT * FROM [OrderList]
SELECT * FROM [Cart]

-- Admin 
UPDATE Customer
SET Permission = '1111'
WHERE Username = 'admin'

DELETE FROM [Cart]
DELETE FROM [Order]

DELETE FROM [OrderList]
WHERE CreateDa = '1578073318545'

DELETE FROM [Product]
WHERE ProductID = 'PZ100'

-- Test
UPDATE Product
SET ProductID = 'PZ10'
WHERE ProductID = 'PZ010'

INSERT INTO Customer
VALUES ('trananhtuan12a10@gmail.com','$2a$10$KJSYeLMhz9q0f/NVhHHFeuvjIO7Uj5OR51ldiF9LVtjwYBSPEPOi.',N'Tran AnhTuan',N'ABC','0981524316','0001')

