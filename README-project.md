# Frontend Mentor - Contact form solution

This is a solution to the [Contact form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form and see a success toast message upon successful submission
- Receive form validation messages if:
  - A required field has been missed
  - The email address is not formatted correctly
- Complete the form only using their keyboard
- Have inputs, error messages, and the success message announced on their screen reader
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![ScreenShot](./public/FireShot/FireShot%20Capture%20001%20-%20Create%20Next%20App%20-%20localhost.png)

- A screen shot showing the contact form.

### Links

- Live Site URL: [Live URL](https://interactive-contact-form.vercel.app/)

## My process

### Built with

- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwindcss](https://v2.tailwindcss.com/) - For styles

### What I learned

The project helped me reinenforced my knowledge of form validation using zod and react-form.

```js
const proudOfThisFunc = () => {
const schema = z.object({
  firstName: z.string().nonempty("This field is required."),
  lastName: z.string().nonempty("This field is required."),
  email: z.string().email("Please enter a valid email address."),
  queryType: z.enum(["Enquiry", "System Request"], {
    errorMap: () => ({ message: "Please select a query type." }),
  }),
  message: z.string().nonempty("This field is required."),
  consent: z.boolean().refine((val) => val, {
    message: "To submit this form, please consent to being contacted.",
  }),
});

type Tschema = z.infer<typeof schema>;
};
```

## Author

- Frontend Mentor - [@Bennet-Ukoh](https://www.frontendmentor.io/profile/Bennet-Ukoh)
- Linkedin - [@ukohbennet](https://www.linkedin.com/in/ukohbennet)
