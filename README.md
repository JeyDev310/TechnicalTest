## Step 1

 Setup & Run Laravel + Vue Project

- git clone https://github.com/JeyDev310/TechnicalTest.git

- composer install

- npm install

- npm run dev

- php artisan serve

## Step 2

Download & Run Postgres Docker Image

- docker pull stellirin/postgres-windows

- docker run -d --name postgres -e POSTGRES_DB=db_technical_test -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=notouch19890401 -p 5432:5432 stellirin/postgres-windows

## Step 3

Download & Run Micro Service Docker Image

- docker pull jay310/companyservice:0.1

- docker run –it –link postgres –p 3000:80 –name companyservicecontainer jay310/companyservice:0.1

## Step 4

Make an Example File - companies.csv

<table>
<tbody>
<tr> <td> tCompany1  </td>  <td> This is first company. </td>  </tr>
<tr> <td> tCompany2  </td>  <td> This is second company. </td> </tr>
</tbody>
</table>

## Step5

- Now you can register and login as a user.

- Then you can create, edit, delete for a company.

- Also you can import csv file to insert companies.

