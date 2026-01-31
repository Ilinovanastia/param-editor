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

class ParamEditor extends React.Component<EditorProps> {
  state: {
    values: Record<number, string>;
  };

  constructor(props: EditorProps) {
    super(props);
    
    const initialValues: Record<number, string> = {};
    
    props.model.paramValues.forEach(item => {
      initialValues[item.paramId] = item.value;
    });
    
    props.params.forEach(param => {
      if (initialValues[param.id] === undefined) {
        initialValues[param.id] = '';
      }
    });

    this.state = {
      values: initialValues
    };
  }

  getModel(): Model {
    const paramValues: ParamValue[] = [];
    
    Object.entries(this.state.values).forEach(([paramIdStr, value]) => {
      const paramId = Number(paramIdStr);
      paramValues.push({
        paramId,
        value: value
      });
    });

    return {
      paramValues,
      colors: this.props.model.colors
    };
  }

  render() {
    return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '500px' }}>
        <h3>Редактор параметров</h3>
      </div>
    );
  }
}

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Редактор параметров товара</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;
