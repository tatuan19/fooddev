CREATE DATABASE WebCSDL
GO

USE WebCSDL

-- Table
-- DROP TABLE [User]
--CREATE TABLE [User]
(
	Name text,
	Username varchar(20) UNIQUE NOT NULL,
	Password text NOT NULL,
	PRIMARY KEY (Username)
)
GO

DROP TABLE [Customer]
CREATE TABLE [Customer]
(
	Username varchar(20) UNIQUE NOT NULL,
	Password text NOT NULL,
	Name ntext,
	Address ntext,
	Phone text,
	Permission varchar(4),
	PRIMARY KEY (Username)
)
GO

DROP TABLE [Product]
CREATE TABLE [Product]
(
	ProductID varchar(5),
	Name ntext,
	Price decimal(10,0),
	Info ntext,
	Image text,
	Category ntext,
	Sold int,
	PRIMARY KEY (ProductID)
)
GO

DROP TABLE [Order]
CREATE TABLE [Order]
(
	OrderID varchar(20),
	Username varchar(20),
	CreateDate date,
	Total decimal(10,0),
	Status ntext,
	PRIMARY KEY (OrderID),
	FOREIGN KEY (Username) REFERENCES [Customer] (Username)
)

DROP TABLE [OrderList]
CREATE TABLE [OrderList]
(
	OrderID varchar(20),
	ProductID varchar(5),
	Quantity int,
	PRIMARY KEY (OrderID, ProductID),
	FOREIGN KEY (OrderID) REFERENCES [Order] (OrderID),
	FOREIGN KEY (ProductID) REFERENCES [Product] (ProductID)
)

DROP TABLE [Cart]
CREATE TABLE [Cart]
(
	Username varchar(20),
	ProductID varchar(5),
	Quantity int,
	PRIMARY KEY (Username, ProductID),
	FOREIGN KEY (Username) REFERENCES [Customer] (Username),
	FOREIGN KEY (ProductID) REFERENCES [Product] (ProductID)
)

-- Trigger
/* cập nhật hàng trong kho sau khi đặt hàng hoặc cập nhật */
DROP TRIGGER trg_OrderList
CREATE TRIGGER trg_OrderList ON [OrderList] AFTER INSERT AS 
BEGIN
	UPDATE [Product]
	SET Sold = Sold + (
		SELECT Quantity FROM inserted
		WHERE ProductID = Product.ProductID
	)
	FROM Product
	JOIN inserted ON Product.ProductID = inserted.ProductID
END
GO

/* xóa giỏ hàng sau khi đặt hàng (order/thanh toán) */
DROP TRIGGER trg_ClearCart
CREATE TRIGGER trg_ClearCart ON [Order] AFTER INSERT AS 
BEGIN
	DELETE FROM [Cart]
	WHERE Username = (
		SELECT Username FROM inserted
	)
END
GO

/* cập nhật hàng trong kho sau khi cập nhật đặt hàng */
/*CREATE TRIGGER trg_CapNhatDatHang on tbl_DatHang after update AS
BEGIN
   UPDATE tbl_KhoHang SET SoLuongTon = SoLuongTon -
	   (SELECT SoLuongDat FROM inserted WHERE MaHang = tbl_KhoHang.MaHang) +
	   (SELECT SoLuongDat FROM deleted WHERE MaHang = tbl_KhoHang.MaHang)
   FROM tbl_KhoHang 
   JOIN deleted ON tbl_KhoHang.MaHang = deleted.MaHang
end
GO*/

/* cập nhật hàng trong kho sau khi hủy đặt hàng */
DROP TRIGGER trg_CancelOrder
CREATE TRIGGER trg_CancelOrder ON [OrderList] FOR DELETE AS 
BEGIN
	UPDATE Product
	SET Sold = Sold - (
		SELECT Quantity FROM deleted 
		WHERE ProductID = Product.ProductID
	)
	FROM Product
	JOIN deleted ON Product.ProductID = deleted.ProductID
END

