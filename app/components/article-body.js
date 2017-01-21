import React from 'react';

const ArticleBody = React.createClass({
  render: function() {
    return (
      <div className="article-form">
                    <div className="article-body">
                        <h1>
                            Title
                        </h1>
                        <hr/>
                        <ol>
                            <li>
                                <h1><s><em><strong>dfgdfgdfg</strong></em></s></h1>
                            </li>
                            <li><s><em><strong>rt</strong></em></s></li>
                            <li><s><em><strong>ret</strong></em></s></li>
                            <li>
                                <small><s><em><strong>erte</strong></em></s></small>
                            </li>
                            <li><s><em><strong>rt</strong></em></s></li>
                        </ol>

                        <hr/>
                        <ul>
                            <li>dfgdfgdgdf</li>
                            <li>gd</li>
                            <li><span className="marker">fg</span></li>
                            <li>dfg&nbsp;</li>
                        </ul>

                        <blockquote>
                            <p>dfgdfgdf</p>
                        </blockquote>

                        <table cellPadding="1" cellSpacing="1">
                            <tbody>
                            <tr>
                                <td>dfgdfg</td>
                                <td>dfgdfggdfgdfg</td>
                            </tr>
                            <tr>
                                <td>dfgfgddfgdfgdfgd</td>
                                <td>
                                    <h3>dfgfgdfgdffgdfgdfg</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>dfgfgdfgd</td>
                                <td>dfgdfgdfgd</td>
                            </tr>
                            </tbody>
                        </table>

                        <p>&nbsp;</p>
                        <footer>
                            <span>Теги: </span>
                            <li className="addedTag"><span>Peppa</span></li>
                            <li className="addedTag"><span>test</span></li>
                        </footer>
                        <footer className="article-info author">
                            <a className="author-content" href="personal_page.html">
                                <img src="app/assets/img/default-avatars/avatar-01.png" width="40px" height="40px"
                                     alt="" />
                                <span> By Joe Smith</span>
                            </a>
                            <span className="comments">1 Aug at 4:20 pm</span>
                        </footer>
                    </div>
                </div>
    );
  }
});

export default ArticleBody;