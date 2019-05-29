const sqlite3 = require("sqlite3").verbose();
// 1 : Create an in memory database
const db = new sqlite3.Database(":memory:");
// 1.1 :Creating and Inserting in ‘Classroom’ table.

db.serialize(function(){
    db.run("CREATE TABLE Classroom (Building TEXT, Room_number NUMBER, Capacity NUMBER )" );
    db.run("INSERT INTO Classroom VALUES('Packard',101,500 )");
    db.run("INSERT INTO Classroom VALUES('Painter',514,10 )");
    db.run("INSERT INTO Classroom VALUES('Taylor',3128,70 )");
    db.run("INSERT INTO Classroom VALUES('Watson',100,30 )");
    db.run("INSERT INTO Classroom VALUES('Watson',120,50 )");
    db.each("SELECT  *FROM Classroom",function(err,row){
    console.log(row);
    });
});
// 1.2 :Creating and Inserting in ‘Depatment’ table.

db.serialize(function(){
    db.run("CREATE TABLE Department (Dept_name TEXT, Building TEXT, Budget NUMBER)" );
    db.run("INSERT INTO Department VALUES('Biology','Watson',90000 )");
    db.run("INSERT INTO Department VALUES('Comp.Sci.','Taylor',100000  )");
    db.run("INSERT INTO Department VALUES('Elec.Eng.','Taylor',85000 )");
    db.run("INSERT INTO Department VALUES('Finance','Painter',120000 )");
    db.run("INSERT INTO Department VALUES('History','Painter',50000 )");
    db.run("INSERT INTO Department VALUES('Music','Packard',80000 )");
    db.run("INSERT INTO Department VALUES('Physics','Watson',70000 )");
    db.each("SELECT  *FROM Department",function(err,row){
    console.log(row);
    });
});

//2. Print the room number and building name for those rooms whose capacity is greater than 50.
    db.each(
        "SELECT Building, Room_number FROM Classroom WHERE Capacity > 50",
        function(err,row){
            if(err){
            console.log(err);
            }
            console.log(row);
    });
//3. Print the names of those departments whose budgets are greater than $85,000.
    db.each(
        "SELECT Dept_name FROM Department WHERE Budget > 85000",
        function(err,row){
            if(err){
            console.log(err);
            }
            console.log(row);        
    });
//4. For each department, print the total capacity available.
    db.each(
        `SELECT Dept_name,SUM(Capacity) as total FROM DEPARTMENT as DEPART
        LEFT JOIN Classroom as Class
        ON DEPART.Building = Class.Building
        GROUP BY DEPART.Dept_name`,
        function(err,row){
            if(err){
            console.log(err);
            }
            console.log(row); 
        });