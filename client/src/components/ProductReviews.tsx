import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { useStateValue } from '../context/State.Context';
import { ReviewTypes } from '../utils/types';

// Statics
import './ProductReviews.css';
interface Props {
  productId: string;
  reviews: ReviewTypes[];
}

const ProductReviews: React.FC<Props> = ({ productId, reviews }) => {
  //  States
  const [rating, setRating] = useState<number | null>(1);
  const [comment, setComment] = useState<string>('');
  const [{ user }] = useStateValue();
  const [reviewsState, setReviewState] = useState([...reviews]);

  // Functions
  const handleComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      setComment(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (comment && rating) {
        const reviewData = {
          comment,
          rating,
          user: { id: user.id, username: user.username },
        };
        const { data } = await Axios.post(`/api/p/${productId}`, reviewData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (data.error) {
          return alert(data.error);
        }
        setReviewState([...reviewsState, reviewData]);
        setRating(1);
        setComment('');
      } else {
        alert('Comment And Rating is Required!');
      }
    },
    [
      comment,
      productId,
      rating,
      reviewsState,
      user.id,
      user.token,
      user.username,
    ]
  );

  return (
    <div className="productReview">
      <div className="productReview__left">
        {user ? (
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Leave A Review
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(_, newValue: number | null) => setRating(newValue)}
              />
            </Box>
            <TextField
              label="Comment"
              multiline
              rows={4}
              onChange={handleComment}
              value={comment}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Review
            </Button>
          </form>
        ) : (
          <div className="productReview__preview">
            <h2>You Need To Login Before Writing a Review</h2>
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="productReview__right">
        <List>
          {reviewsState.map((r) => (
            <ListItem alignItems="flex-start" key={r._id}>
              <ListItemAvatar>
                <Avatar
                  alt={r.user.username}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Rating value={r.rating} readOnly />}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {r.user.username}
                    </Typography>
                    {` — ${r.comment}`}
                  </React.Fragment>
                }
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default memo(ProductReviews);
