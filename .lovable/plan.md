

# Rurban Africa — Non-Profit Website

## Overview
A modern, green-themed nonprofit website for **Rurban Africa** ("One Africa, Two Worlds, One Future") with smooth animations, light/dark mode, and Flutterwave donation integration. No authentication required.

## Design Direction
- **Color palette**: Deep greens, earth tones, and gold accents inspired by farmafrica.org — representing Africa's natural beauty
- **Gradients**: Green-to-dark gradient hero sections, subtle gradient overlays on cards
- **Typography**: Bold, impactful headings with clean body text
- **Animations**: Framer Motion for page transitions, scroll-reveal for sections, smooth scrolling between sections

## Pages & Sections (Codebase Setup)

### 1. Homepage (Hero + Section Stubs)
- Full-screen hero with tagline: "One Africa. Two Worlds. One Future."
- Impact stats bar (1,950 children reached, 6 communities, etc.)
- Brief "About" teaser section
- Programs overview cards
- Call-to-action: Donate / Partner / Volunteer
- *Sections will be placeholder/skeleton — footer is the only fully complete section*

### 2. Footer (Fully Complete)
- **Left column**: Rurban Africa logo, mission tagline, social media icons (Facebook, Instagram, X/Twitter, LinkedIn)
- **Quick Links**: Home, About Us, What We Do, Get Involved
- **Support**: Contact, Volunteer, Partner With Us, Donate
- **Contact Info**: Email (rurbanafrica037@gmail.com), Phone numbers, Lagos & Delta office addresses
- **Bottom bar**: Copyright, Privacy Policy, Terms & Conditions, **Light/Dark mode toggle**
- Style inspired by the reference image but adapted with green theme and gradients

### 3. Navbar (Setup)
- Sticky navigation with logo
- Links: Home, About, Programs, Get Involved, Donate
- Mobile hamburger menu
- Transparent on hero, solid on scroll

## Technical Setup
- **Framer Motion** for animations and page transitions
- **Lucide React** for all icons
- **Scroll-reveal animations** on section entry using Framer Motion's `whileInView`
- **Smooth scrolling** via CSS `scroll-behavior: smooth`
- **Light/Dark mode** with `next-themes`, toggle placed in footer
- **Green-ish theme** with custom CSS variables for both light and dark modes
- **Gradients** on hero, cards, and section backgrounds

## Donation Integration (Setup)
- Donate section with currency options: Naira (₦), Dollars ($), Pounds (£)
- Donation frequency: Single, Weekly, Monthly
- Each option links out to **Flutterwave payment links** (external redirect, no backend needed)
- Prominent "Donate" CTA button in navbar and throughout the site

## What's NOT Included (for now)
- No login/authentication
- No backend/database — forms are UI-only initially
- Only the footer will be fully designed; other sections will be structured but minimal
- Actual Flutterwave payment link URLs will need to be provided later

