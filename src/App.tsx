import React, { useRef, useState } from 'react';

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

  handleParamChange = (paramId: number, value: string) => {
    this.setState({
      values: {
        ...this.state.values,
        [paramId]: value
      }
    });
  };

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
    const { params } = this.props;
    const { values } = this.state;

    return (
      <div style={styles.editorContainer}>
        {params.map(param => (
          <div key={param.id} style={styles.paramRow}>
            <label style={styles.label}>
              {param.name}
            </label>
            <input
              type="text"
              value={values[param.id] || ''}
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
              style={styles.input}
              placeholder={`Введите ${param.name.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  editorContainer: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  paramRow: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold' as const,
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box' as const
  }
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' }
    ],
    colors: []
  };

  const editorRef = useRef<ParamEditor>(null);
  const [output, setOutput] = useState<string>('');

  const handleGetModel = () => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      setOutput(JSON.stringify(model, null, 2));
    }
  };

  const handleResetOutput = () => {
    setOutput('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px',
        marginTop: '30px'
      }}>
        <div>
          <h2>Редактор параметров</h2>
          <ParamEditor 
            ref={editorRef}
            params={params} 
            model={initialModel} 
          />
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleGetModel}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Вызвать getModel()
            </button>
            
            <button 
              onClick={handleResetOutput}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Очистить вывод
            </button>
          </div>
        </div>
        
        <div>
          <h2>Результат работы getModel()</h2>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            minHeight: '300px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflow: 'auto' as const
          }}>
            {output ? (
              <pre style={{ margin: 0 }}>{output}</pre>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                Нажмите "Вызвать getModel()"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
