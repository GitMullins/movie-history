const friendRsvps = (friends, rsvps) => friends.map((friend) => {
  const f = friend;
  const rsvp = rsvps.find(r => r.friendId === f.id);
  if (rsvp) {
    f.rsvpId = rsvp.id;
    f.statusId = rsvp.statusId;
  }
  return f;
});

export default { friendRsvps };
