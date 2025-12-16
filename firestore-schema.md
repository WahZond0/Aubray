```markdown
# Firestore Database Schema Notes

This file contains notes and sample structures for the Firestore database used by Aubray.

## Collections

Describe your Firestore collections here.

### Example Collection: `users`

- Document ID: User UID
- Fields:
    - `name`: String
    - `email`: String
    - `creation_timestamp`: Timestamp
    - `user_type`: String (e.g., 'agent', 'business', 'client')
    - `profile_data`: Map (e.g., bio, contact info)

## Document Structures

Provide sample document structures for each collection.

### Example Document: `users/{userId}`
```
json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "creation_timestamp": "<timestamp>",
  "user_type": "agent",
  "profile_data": {
    "bio": "Experienced real estate agent...",
    "phone": "+1 123 456 7890"
  }
}
```
## Relationships and Subcollections

Describe relationships between collections and any subcollections you plan to use.

## Security Rules

Notes on Firestore security rules.

## Indexing

Notes on Firestore indexing strategies.
```