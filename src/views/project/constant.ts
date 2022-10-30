export enum ESTATUS {
  NEED=0,
  WAIT_DEVELOP=10,
  DEVELOP=20,
  DEVELOP_DONE=30,
  WAIT_TEST=40,
  TEST=50,
  DEBUG=60,
  PRE=70,
  PRODUCTION=80
}

export const TASK_STATUS = [
  {
    label: '需求阶段',
    value: ESTATUS.NEED
  },
  {
    label: '待开发',
    value: ESTATUS.WAIT_DEVELOP
  },
  {
    label: '开发中',
    value: ESTATUS.DEVELOP
  },
  {
    label: '开发完成',
    value: ESTATUS.DEVELOP_DONE
  },
  {
    label: '待测试',
    value: ESTATUS.WAIT_TEST
  },
  {
    label: '测试中',
    value: ESTATUS.TEST
  },
  {
    label: '处理bug',
    value: ESTATUS.DEBUG
  },
  {
    label: '预生产',
    value: ESTATUS.PRE
  },
  {
    label: '上线',
    value: ESTATUS.PRODUCTION
  }
]

const map:any = {}
TASK_STATUS.forEach(item => {
  map[item.value] = item
});

export const TASK_MAP = map