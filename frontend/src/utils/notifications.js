export const NOTIFICATIONS = [
  {
    id: "welcome-pixeltales",
    title: "Welcome to PixelTales! 🎬",
    content: `# Welcome to PixelTales! 🎉

We're happy to have you here.

### What's new?

- 🎬 Discover new movies
- 📺 Explore your favourite cartoons
- ❤️ Like and save movies
- 💬 Join the community

Enjoy your stay on **PixelTales**!`,
    createdAt: "2026-09-08T10:00:00",
    expiresAt: null,
  },

  {
    id: "new-shinchan-movie",
    title: "New Shinchan Movie Added! 🔥",
    content: `# New Shinchan Movie

A brand-new **Shinchan movie** has been added to PixelTales.

> Go check it out now!

[Watch Movie](/movie/s-action-kamen-vs-haigure-devil)`,
    createdAt: "2026-09-09T12:00:00",
    expiresAt: null,
  },

  {
    id: "gallery-update",
    title: "Gallery System Updated 🖼️",
    content: `## Gallery Update

PixelTales now supports a more compact gallery format.

You can now store gallery scenes using:

\`Scene[---20---].png\`

instead of storing every image URL individually.

This keeps the movie data much cleaner.`,
    createdAt: "2026-09-09T18:00:00",
    expiresAt: null,
  },

  {
    id: "upcoming-doraemon",
    title: "Upcoming Doraemon Movie 🚀",
    content: `# Doraemon Movie Announcement

A new **Doraemon movie** is coming soon!

### Release

**2nd October 2026**

Stay tuned for more updates from PixelTales.`,
    createdAt: "2026-09-10T10:00:00",
    expiresAt: "2026-10-03T00:00:00",
  },
];

export const getActiveNotifications = () => {
  const now = Date.now();

  return NOTIFICATIONS.filter(
    (notification) =>
      !notification.expiresAt ||
      new Date(notification.expiresAt).getTime() > now,
  );
};
