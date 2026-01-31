import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface EditorProps {
  params: Param[];
  model: Model;
}

const App: React.FC = () => {
  return (
    <div>
      <h1>Редактор параметров</h1>
    </div>
  );
};

export default App;
