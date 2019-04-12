import 'es6-promise/auto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure, action, observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { Button, Select , List , Typography , Card} from 'antd';
import './app.css'
configure({
    enforceActions: 'observed'
});
class Store {
    @observable
    logsTypes: any[] = ["info", "warn", "fatal", "debug", "error"];
    
    @observable
    logDataArr : any[] = [];

    @observable 
    lelveArr : any[] = [];

    @action.bound 
    addLogData = (arr: []) => {
        this.logDataArr = arr;
        this.lelveArr = arr;
        console.log(this.lelveArr)
    };
    @action.bound
    clearArr = () => {
        this.logDataArr = [];
        this.lelveArr = [];
        (window as any).clearResArr()
    }
    @action.bound
    switchLelve = (lelve:any) => {
        if(lelve==='all'){
          this.lelveArr=this.logDataArr;
        }else{
          this.lelveArr=this.logDataArr.filter((item,index)=>{
             return item.lelve==lelve
          })
        }

    }
}

const store = new Store();
const Option = Select.Option;
(window as any).store = store;

@observer
class App extends React.Component {
    selectedRows: string[] = [];

    componentDidMount = async () => {
    };
    handleChange(value:any) {
        store.switchLelve(value)
    };
    getLocalTime(date:any) {     
        return new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    };
    render() {
        return (
            <div>
                <div>
                    <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleChange}>
                         <Option value={'all'}>all</Option>
                         {
                             store.logsTypes.map((item,index)=>{
                                return <Option value={index+1} key={index}>{item}</Option>
                             })
                         }
                    </Select>
                    <Button onClick={store.clearArr} type="primary">清除数据</Button>
                   
                </div>
                    <List
                        size="large"
                        header={<div>Header</div>}
                        bordered
                        dataSource={store.lelveArr}
                        renderItem={item => (<List.Item><Typography.Text mark>等级</Typography.Text>{item.lelve}<Typography.Text mark>时间</Typography.Text>{this.getLocalTime(item.date)}<Typography.Text mark>message</Typography.Text>{item.message}</List.Item>)}
                    />
                    <Card
                        title="等级介绍"
                        style={{ width: 300 }}
                    >
                    {
                        store.logsTypes.map((item,index)=>{
                            return <p key={index}>等级{index+1} : {item}</p>
                        })
                    }
                    </Card>
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('logContainer')
);
