# Đổi Đồ Mobile Application - Project Plan

## Project Overview
The **Đổi Đồ** mobile application enables students within a university or dormitory to give away, exchange, or sell used items (e.g., textbooks, furniture, electronics) to other students. The app addresses the pain point of unused items being discarded or hard to sell, while other students need those same items. It provides a simple platform for posting, browsing, and communicating directly, without complex e-commerce features.

### Pain Points
- Students have unused items (textbooks, furniture, clothes, electronics) that are wasteful to discard.
- Selling items individually is cumbersome and hard to find buyers.
- Other students need these items but lack a centralized, easy-to-use platform.

### Target Audience
- Students within the same university or dormitory.
- Usage peaks at semester start/end or when students move rooms.

### Core Features
- Quick item posting with photos, name, category, and type (give away/exchange/sell).
- Category-based browsing (books, electronics, personal items).
- Direct chat for discussing item condition and arranging campus pickups.

### Supplementary Features
- User trust ratings (👍/👎) to reduce spam.
- Notifications for new items in categories of interest.

## Product Backlog

### Epic 1: User Account Management
- **User Story**: As a user, I want to register and log in to the app so that I can access its features securely.
  - Priority: High
  - Estimated Effort: 8 story points
- **User Story**: As a user, I want to edit my profile (name, contact info, dorm location) so that others can contact me for item exchanges.
  - Priority: Medium
  - Estimated Effort: 5 story points
- **User Story**: As a user, I want to log out of the app to secure my account when not in use.
  - Priority: Medium
  - Estimated Effort: 3 story points

### Epic 2: Item Posting
- **User Story**: As a user, I want to post an item quickly by uploading photos, entering a name, selecting a category, and choosing “give away/exchange/sell” so that others can see my item.
  - Priority: High
  - Estimated Effort: 13 story points
- **User Story**: As a user, I want to edit or delete my posted items so that I can update or remove them if needed.
  - Priority: Medium
  - Estimated Effort: 5 story points

### Epic 3: Item Search and Browsing
- **User Story**: As a user, I want to browse items by category (books, electronics, personal items) so that I can find what I need easily.
  - Priority: High
  - Estimated Effort: 8 story points
- **User Story**: As a user, I want to search for items by keywords to quickly locate specific items.
  - Priority: High
  - Estimated Effort: 5 story points
- **User Story**: As a user, I want to filter items by type (give away, exchange, sell) to match my preferences.
  - Priority: Medium
  - Estimated Effort: 5 story points

### Epic 4: Direct Communication
- **User Story**: As a user, I want to chat directly with the item owner to discuss item condition and arrange pickup within the campus.
  - Priority: High
  - Estimated Effort: 13 story points
- **User Story**: As a user, I want to receive notifications for new chat messages so that I can respond promptly.
  - Priority: Medium
  - Estimated Effort: 5 story points

### Epic 5: User Trust and Safety
- **User Story**: As a user, I want to rate other users (👍/👎) after a transaction to build trust and reduce spam.
  - Priority: Medium
  - Estimated Effort: 8 story points
- **User Story**: As a user, I want to see other users’ ratings to assess their trustworthiness before contacting them.
  - Priority: Medium
  - Estimated Effort: 5 story points

### Epic 6: Notifications
- **User Story**: As a user, I want to receive notifications when new items in my interested categories are posted so that I don’t miss relevant items.
  - Priority: Medium
  - Estimated Effort: 8 story points
- **User Story**: As a user, I want to customize my notification preferences to control what alerts I receive.
  - Priority: Low
  - Estimated Effort: 5 story points

### Epic 7: UI/UX Design
- **User Story**: As a user, I want a simple and intuitive interface to navigate the app easily without confusion.
  - Priority: High
  - Estimated Effort: 13 story points
- **User Story**: As a user, I want the app to be visually appealing and consistent with the university’s branding to feel familiar.
  - Priority: Medium
  - Estimated Effort: 5 story points

### Non-Functional Requirements
- **Task**: Ensure the app is optimized for performance on Android and iOS devices.
  - Priority: High
  - Estimated Effort: 8 story points
- **Task**: Implement data security measures (e.g., encrypted chat, secure user data storage).
  - Priority: High
  - Estimated Effort: 8 story points
- **Task**: Ensure the app is scalable to handle increased users during peak times (e.g., semester start/end).
  - Priority: Medium
  - Estimated Effort: 5 story points

## Sprint Plan: Sprint 1 - MVP Foundation

### Sprint Goal
Build the core functionality for users to register, post items, browse items, and communicate, delivering the minimum viable product (MVP).

### Duration
- **Start Date**: September 30, 2025
- **End Date**: October 14, 2025
- **Length**: 2 weeks

### Team
- 4 Developers
- 1 Designer
- 1 QA Tester

### Selected Backlog Items
- User Account Management: Register and log in (8 story points)
- Item Posting: Post an item quickly (13 story points)
- Item Search and Browsing: Browse items by category (8 story points)
- Direct Communication: Chat directly with item owner (13 story points)

### Total Story Points
- 42 story points (slightly over team velocity of 30-40, but feasible with minor scope adjustments if needed)

## Sprint 1 Tickets

### Ticket 1: User Registration and Login
- **ID**: TICKET-001
- **User Story**: As a user, I want to register and log in to the app so that I can access its features securely.
- **Priority**: High
- **Estimated Effort**: 8 story points
- **Tasks**:
  - Design login/registration UI (2 story points)
  - Implement backend API for user authentication (3 story points)
  - Integrate frontend with backend for login/registration (2 story points)
  - Test authentication flow (1 story point)
- **Acceptance Criteria**:
  - Users can register with email, password, and university ID.
  - Users can log in with email and password.
  - Passwords are securely hashed in the backend.
  - Error messages are displayed for invalid inputs (e.g., duplicate email, wrong password).
- **Assigned To**: Developer 1, Designer
- **Dependencies**: None

### Ticket 2: Post an Item
- **ID**: TICKET-002
- **User Story**: As a user, I want to post an item quickly by uploading photos, entering a name, selecting a category, and choosing “give away/exchange/sell” so that others can see my item.
- **Priority**: High
- **Estimated Effort**: 13 story points
- **Tasks**:
  - Design item posting UI (3 story points)
  - Implement photo upload functionality (3 story points)
  - Create backend API for item posting (4 story points)
  - Integrate frontend with backend for item posting (2 story points)
  - Test item posting flow (1 story point)
- **Acceptance Criteria**:
  - Users can upload up to 5 photos per item.
  - Users can enter item name, description, category (books, electronics, personal items), and type (give away, exchange, sell).
  - Posted items are visible in the app’s browse section.
  - Users receive confirmation after successful posting.
- **Assigned To**: Developer 2, Developer 3, Designer
- **Dependencies**: User Registration and Login (TICKET-001)

### Ticket 3: Browse Items by Category
- **ID**: TICKET-003
- **User Story**: As a user, I want to browse items by category (books, electronics, personal items) so that I can find what I need easily.
- **Priority**: High
- **Estimated Effort**: 8 story points
- **Tasks**:
  - Design category browsing UI (2 story points)
  - Implement backend API for fetching items by category (3 story points)
  - Integrate frontend with backend for category browsing (2 story points)
  - Test browsing functionality (1 story point)
- **Acceptance Criteria**:
  - Users can view items grouped by categories (books, electronics, personal items).
  - Each item displays a thumbnail, name, and type (give away/exchange/sell).
  - Categories are filterable via a dropdown or tabs.
  - Loading time for item list is under 2 seconds.
- **Assigned To**: Developer 4, Designer
- **Dependencies**: Post an Item (TICKET-002)

### Ticket 4: Direct Chat with Item Owner
- **ID**: TICKET-004
- **User Story**: As a user, I want to chat directly with the item owner to discuss item condition and arrange pickup within the campus.
- **Priority**: High
- **Estimated Effort**: 13 story points
- **Tasks**:
  - Design chat UI (3 story points)
  - Implement backend for real-time chat (WebSocket or similar) (4 story points)
  - Integrate frontend with backend for chat functionality (3 story points)
  - Ensure chat data is encrypted (2 story points)
  - Test chat functionality (1 story point)
- **Acceptance Criteria**:
  - Users can initiate a chat with the item owner from the item’s detail page.
  - Chat supports text messages and timestamps.
  - Messages are delivered in real-time or with minimal delay.
  - Chat data is encrypted to ensure privacy.
- **Assigned To**: Developer 1, Developer 2, QA Tester
- **Dependencies**: User Registration and Login (TICKET-001), Post an Item (TICKET-002)

## Additional Notes
- **Technology Stack**: 
  - **Frontend**: React Native for cross-platform mobile development (Android/iOS).
  - **Backend**: Node.js with MongoDB for data storage; Firebase for real-time chat and notifications.
  - **Authentication**: JWT or Firebase Authentication for secure user login.
- **Next Steps**:
  - After Sprint 1, prioritize remaining high-priority items (e.g., keyword search) and medium-priority features (e.g., user ratings, notifications) in Sprint 2.
  - Conduct user testing post-Sprint 1 to gather feedback on the MVP.
- **Assumptions**:
  - The team has experience with React Native and Node.js.
  - The team can handle 30-40 story points per sprint; Sprint 1’s 42 points may require minor scope adjustments.
- **Risks**:
  - Real-time chat implementation may face delays due to WebSocket complexity.
  - Photo upload functionality must be optimized to avoid performance issues on low-end devices.
