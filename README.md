### 1. MVP Feature List with Short Descriptions

1. **User Authentication**: Allow users to sign up, log in, and log out securely. Users can manage their profile details.
2. **Create, Read, Update, Delete (CRUD) Art Pieces**: Users can create an art piece by interacting with the remote robot, view details of their art, update the art's description or title, and delete art pieces.
3. **CRUD Reviews**: Users can write reviews on other users' art pieces, update their reviews, and delete them if necessary.
4. **Art Gallery**: Display all created art pieces in a public gallery where users can browse, filter, and search for art.
5. **User Dashboard**: Each user has a personal dashboard where they can manage their created art pieces and reviews.

### 2. DB Schema

- **Users**: 
  - `id` (Primary Key)
  - `username` (Unique)
  - `email` (Unique)
  - `password_hash`
  - `created_at`
  - `updated_at`

- **Art Pieces**: 
  - `id` (Primary Key)
  - `user_id` (Foreign Key -> Users)
  - `title`
  - `description`
  - `image_url`
  - `created_at`
  - `updated_at`

- **Reviews**:
  - `id` (Primary Key)
  - `art_piece_id` (Foreign Key -> Art Pieces)
  - `user_id` (Foreign Key -> Users)
  - `content`
  - `rating` (Optional, if you want a rating system)
  - `created_at`
  - `updated_at`

### 3. User Story

**As an artist, I want to create unique art pieces by interacting with a remote robot so that I can showcase my work in an online gallery. I want to be able to receive feedback from other artists in the community by allowing them to review my work. Additionally, I want to manage my art pieces and reviews easily from a personal dashboard.**


### 4. Wireframe

![Community Artifax Gallery](https://i.ibb.co/fMxQBTr/3360962-E-E9-AD-48-EF-A366-C058-C3215-E1-E.jpg)

