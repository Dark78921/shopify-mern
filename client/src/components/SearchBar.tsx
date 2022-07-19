import React, { FC, memo, useCallback, useState } from 'react';
import { ProductType } from '../utils/types';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import './Search.css';

interface Props {
  products: ProductType[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

const SearchBar: FC<Props> = ({ products }) => {
  const classes = useStyles();
  const [searchedArr, setSearchedArr] = useState<ProductType[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchFilterings = useCallback(
    (searchTerms: string) => {
      if (searchTerms) {
        const searchTermRegex = new RegExp(`^${searchTerms}`, 'gi');
        const filteredItems = products.filter((p) =>
          p.name.match(searchTermRegex)
        );
        setSearchedArr(filteredItems);
      } else {
        setSearchedArr(products);
      }
    },
    [products]
  );

  return (
    <div className="search">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsTyping(false);
            }, 250);
          }}
          onChange={(e) => {
            setIsTyping(true);
            handleSearchFilterings(e.target.value);
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      {isTyping && (
        <div className="search__lists">
          {searchedArr.length > 0 ? (
            <ul>
              {searchedArr.map((p) => (
                <li key={p._id}>
                  <Link to={`/s/${p._id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <h1>No Search Results Found :)</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchBar);
