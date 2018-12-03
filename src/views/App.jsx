// views/App.jsx

// import statements
// ...
// ...

// Add the title bar
import TitleBar from './containers/TitleBar.jsx';

// Game component and styles object
// ...
// ..

const App = ({ classes }) => {
  return (
    <div>
      <div>
        <header>
          {/* replace the old header text with the title bar */}
          <TitleBar />
        </header>
      </div>
      { /*
          rest of the App content
          ...
          ...
      */ }
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);