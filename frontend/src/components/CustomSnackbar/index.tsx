import React from 'react';

const CustomSnackbar = () => (
  <h1>Custom snack</h1>
);
// const { closeSnackbar } = useSnackbar();
// const [expanded, setExpanded] = useState(false);

// const handleExpandClick = useCallback(() => {
//   setExpanded((oldExpanded) => !oldExpanded);
// }, []);

// const handleDismiss = useCallback(() => {
//   closeSnackbar(props.id);
// }, [props.id, closeSnackbar]);

// return (
//   <SnackbarContent>
//     <Snackbar onClose={() => handleDismiss} autoHideDuration={2000}>
//       <Alert severity={props.options.variant} onClose={() => handleDismiss}>
//         <AlertTitle>{props.options.title}</AlertTitle>
//         {props.options.message}
//         —
//         {' '}

//         {
//       !!props.options.linkTo
//       && (
//       <Link
//         style={{ textDecoration: 'none', color: '#2e7d32' }}
//         to="/cart"
//       >
//         <strong>{props.options.linkMessage}</strong>

//       </Link>
//       )

//     }
//       </Alert>
//     </Snackbar>
//   </SnackbarContent>

export default CustomSnackbar;
