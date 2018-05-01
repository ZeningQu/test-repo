import * as React from 'react';

import { DEFAULT_TAB_TITLE } from 'datavoyager/build/models';

export interface ItemTitleProps {
  itemTitle: string;
  isActiveItem: boolean;
  onTitleUpdate: (newTitle: string) => void;
}

export interface ItemTitleState {
  editing: boolean;
  titleUnderEdit?: string;
}

export class ItemTitleUI extends React.PureComponent<ItemTitleProps, ItemTitleState> {
  constructor(props: ItemTitleProps) {
    super(props);
    this.state = {
      editing: false
    };

    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitOnEnter = this.submitOnEnter.bind(this);
    this.autoFocus = this.autoFocus.bind(this);
  }

  public render() {
    return (
      <div>
        {(this.state.editing) && (this.props.isActiveItem) ?
          <input
            type="text"
            value={this.state.titleUnderEdit}
            onChange={this.onChange}
            onBlur={this.onSubmit}
            onKeyUp={this.submitOnEnter}
            ref={this.autoFocus}
          />
        : <span onDoubleClick={this.onEdit}>{this.props.itemTitle}</span>
        }
      </div>
    );
  }

  onChange(event: any) {
    this.setState({
      titleUnderEdit: event.target.value,
    });
  }

  onSubmit(event: any) {
    const newTitle = this.state.titleUnderEdit === '' ?
      DEFAULT_TAB_TITLE : this.state.titleUnderEdit;
    this.props.onTitleUpdate(newTitle);
    this.setState({editing: false});
  }

  submitOnEnter(event: any) {
    if (event.key === 'Enter') {
      this.onSubmit(event);
    }
  }

  onEdit(event: any) {
    this.setState({
      editing: true,
      titleUnderEdit: event.target.innerHTML
    });
  }

  autoFocus(input: HTMLInputElement) {
    if (input) {
      input.focus();
      input.select();
    }
  }
}
