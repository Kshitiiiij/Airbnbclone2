## [Airbnb Clone](https://airbnbclone2.vercel.app/)

This is a Next Js 13 airbnb clone created with the newest app directory. It uses [Mongo db](https://www.mongodb.com/) as it's database and [Prisma](https://www.prisma.io/) as ORM. 

## Technical Features 
- Next Js 13 used as meta framework.
- TypeScript is used as scripting language.
- Tailwind CSS used for styling.
- React Hot Toast for notifcaion.
- React-form-hook for handling input fields.
- Map imported from React leaflet.
- OAuth, by next-auth.
- Hosted on Vercel.

## Features
- Sign up and Login facility.
- Google and Github SignUp avaliable.
- Users can uplaod details about properties, input fields are handled by react from hook.
- Users can uplaod images, which are stored in Cloudinary CDN.
- Users can book reservations.
- Users can mark thier favourite properties that are displayed in seprate tab.
- Seprate tabs for your reservations and resrvation on your property.
- Can cancel reservation.

## Preview 

Home Page

![image](https://user-images.githubusercontent.com/102326095/232797353-8d97b2c7-8758-41af-a7a9-1074368335cf.png)

Login Page

![image](https://user-images.githubusercontent.com/102326095/232798239-bad248ec-77a0-49fd-a053-f16f4f0de6a4.png)

Favourites Page

![image](https://user-images.githubusercontent.com/102326095/232798520-9baf9bee-9405-4335-988e-2236996cc33e.png)

Reservation Page

![image](https://user-images.githubusercontent.com/102326095/232799415-f79944b8-471e-4b92-a376-ea3f64a57b6c.png)


## Development 

Running dev server:
```sh
npm run build
```
## Environemt Variables

.env
Prisma to db connection string:
```sh
DATABASE_URL = "<URL goes here>"
```

.env.local:
```sh
NEXT_AUTH_SECRET="<Auth secret goes here>"
GITHUB_ID="<Github Oauth id>"
GITHUB_SECRET="<Github Oauth Secret>"
GOOGLE_CLIENT_ID="<Google Oauth id>"
GOOGLE_CLIENT_SECRET="<Google Oauth Secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Coludinary name>"
```




